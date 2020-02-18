const firebase = require('firebase');
const admin = require('firebase-admin');
const config = require('../util/config');
const { userValidators } = require('./userValidators');

const db = admin.firestore();

const userHandlers = {

	signup: async (req, res) => {
		const userData = userValidators.sanitiseSignupData(req);
		const { valid, errors } = userValidators.validateSignupData(userData);
		if (!valid) return res.status(400).json(errors);

		try {

			const querySnapshot = await db
				.collection('users')
				.where('uniqueName_LC', '==', userData.uniqueName.toLowerCase())
				.limit(1)
				.get();
			if (!querySnapshot.empty) {
				return res.status(400).json({ uniqueName: 'This unique name is already used.' });
			}

			const data = await firebase.auth().createUserWithEmailAndPassword(userData.emailAddress, userData.password);
			const firebaseUser = data.user;
			const customClaims = {
				isMember: true,
			};
			// if (userData.uniqueName === 'phill') {
			// 	customClaims.isSuperAdmin = true;
			// }

			await admin.auth().setCustomUserClaims(firebaseUser.uid, customClaims);

			const idToken = await firebaseUser.getIdToken();
			const user = {
				bio: '',
				createdOn: new Date().toISOString(),
				emailAddress: userData.emailAddress,
				firstName: userData.firstName,
				avatarUrl: null,
				lastName: userData.lastName,
				location: '',
				uniqueName: userData.uniqueName,
				uniqueName_LC: userData.uniqueName.toLowerCase(),
				uid: firebaseUser.uid,
			};

			await db.doc(`/users/${user.uid}`).set(user);
			return res.status(201).json({ idToken, user });

		} catch (err) {
			if (err.code === 'auth/emailAddress-already-in-use') {
				return res.status(400).json({ emailAddress: 'This emailAddress is already used.' });
			} else {
				console.error(err);
				return res.status(500).json({ general: `Something went wrong, please try again (${err.message})` });
			}
		}
	},

	signin: async (req, res) => {
		const user = userValidators.sanitiseSigninData(req);
		const { valid, errors } = userValidators.validateSigninData(user);
		if (!valid) return res.status(400).json(errors);

		try {
			const data = await firebase
				.auth()
				.signInWithEmailAndPassword(user.emailAddress, user.password);

			const firebaseUser = data.user;
			console.log('signin got firebaseUser');

			const token = await firebaseUser.getIdToken();
			console.log('signin got idToken ', token);
			// admin.auth().verifyIdToken(idToken);
			// console.log('signin verified idToken ');

			const { uid } = firebaseUser;
			console.log('signin got uid ', uid);
			const userDoc = await db.doc(`/users/${uid}`).get();
			if (userDoc.exists) {
				const { uid } = firebaseUser;
				const { bio, createdOn, emailAddress, firstName, lastName, uniqueName, avatarUrl, location, roles } = userDoc.data();
				const user = {
					bio,
					createdOn,
					emailAddress,
					firstName,
					avatarUrl,
					lastName,
					location,
					uniqueName,
					uid,
				};

				return res.status(200).json({ token, user });
			} else {
				return res.status(404).json({ error: 'User not found' });
			}
		} catch (err) {
			console.error(err);
			// auth/wrong-password
			// auth/user-not-user
			return res.status(403).json({ general: 'Incorrect credentials. Please try again' });
		}
	},

	resetPassword: async (req, res) => {
		const data = userValidators.sanitiseResetPasswordData(req);
		const { valid, errors } = userValidators.validateResetPasswordData(data);
		if (!valid) return res.status(400).json(errors);
		console.log('resetPassword emailAddress ', Object.keys(req.body));
		console.log('resetPassword emailAddress ', data);

		try {
			await firebase
				.auth()
				.sendPasswordResetEmail(data.emailAddress);
			return res.status(200);
		} catch (err) {
			console.error(err);
			if (err.code === 'auth/user-not-found') {
				return res.status(400).json({ emailAddress: 'There is no user with this email address.' });
			} else {
				return res.status(500).json({ general: `Something went wrong. Please try again.` });
			}
		}
	},

	fetchAuthenticatedUser: async (req, res) => {
		try {
			const userDoc = db.doc(`/users/${req.user.uid}`).get();
			if (!userDoc.exists) {
				return res.status(404).json({ error: 'User not found' });
			}
			const { bio, createdOn, emailAddress, firstName, lastName, uniqueName, avatarUrl, location, roles } = userDoc.data();
			const user = {
				bio,
				createdOn,
				emailAddress,
				firstName,
				avatarUrl,
				lastName,
				location,
				uniqueName,
				uid: req.user.uid,
			};
			return res.status(200).json({ user });
		} catch (err) {
			console.error(err);
			return res.status(500).json({ error: err.code });
		}
	},

	fetchUserDetails: async (req, res) => {
		try {
			const userDoc = db.doc(`/users/${req.params.uid}`).get();
			if (!userDoc.exists) {
				return res.status(404).json({ error: 'User not found' });
			}
			const { firstName, lastName, uniqueName, avatarUrl, roles } = doc.data();
			const user = {
				firstName,
				avatarUrl,
				lastName,
				uniqueName,
				roles,
				uid: req.params.uid,
			};
			return res.status(200).json(user);
		} catch (err) {
			console.error(err);
			return res.status(500).json({ error: err.code });
		}
	},

	updateUser: async (req, res) => {
		let userDetails = userValidators.sanitiseUserDetails(req);
		console.log('updateAuthenticatedUser userDetails', userDetails);

		try {
			const userDoc = await db.doc(`/users/${req.user.uid}`).update(userDetails).get();
			const { bio, createdOn, emailAddress, firstName, lastName, uniqueName, avatarUrl, location, roles } = userDoc.data();
			const user = {
				bio,
				createdOn,
				emailAddress,
				firstName,
				avatarUrl,
				lastName,
				location,
				roles,
				uniqueName,
				uid: req.user.uid,
			};
			return res.status(200).json({ user });
		} catch (err) {
			console.error(err);
			// return res.status(500).json({ error: err.code });
			return res.status(500).json({ general: 'Something went wrong, please try again' });
		}
	},

	uploadImage: (req, res) => {
		const BusBoy = require('busboy');
		const path = require('path');
		const os = require('os');
		const fs = require('fs');

		const busboy = new BusBoy({ headers: req.headers });

		let imageToBeUploaded = {};
		let imageFileName;

		busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
			console.log(fieldname, file, filename, encoding, mimetype);
			if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
				return res.status(400).json({ error: 'Wrong file type submitted' });
			}
			// my.image.png => ['my', 'image', 'png']
			const imageExtension = filename.split('.')[
				filename.split('.').length - 1
			];
			// 32756238461724837.png
			imageFileName = `${Math.round(
				Math.random() * 1000000000000
			).toString()}.${imageExtension}`;
			const filepath = path.join(os.tmpdir(), imageFileName);
			imageToBeUploaded = { filepath, mimetype };
			file.pipe(fs.createWriteStream(filepath));
			return res.status(200);
		});
		busboy.on('finish', async () => {
			try {
				await admin
					.storage()
					.bucket()
					.upload(imageToBeUploaded.filepath, {
						resumable: false,
						metadata: {
							metadata: {
								contentType: imageToBeUploaded.mimetype
							}
						}
					});

				const avatarUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
				await db.doc(`/users/${req.user.uniqueName}`).update({ avatarUrl });
				return res.json({ message: 'image uploaded successfully' });
			} catch (err) {
				console.error(err);
				return res.status(500).json({ error: 'something went wrong D' });
			}
		});
		busboy.end(req.rawBody);
	},

};

module.exports = { userHandlers };
