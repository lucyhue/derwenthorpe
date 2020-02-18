const admin = require('firebase-admin');
const db = admin.firestore();

module.exports = {

	auth: (req, res, next) => {
		const { authorization } = req.headers;

		let idToken;
		if (authorization && authorization.startsWith('Bearer ')) {
			idToken = authorization.split('Bearer ')[1];
		} else {
			console.error('No token found');
			return res.status(403).json({ error: 'Unauthorized' });
		}

		return admin
			.auth()
			.verifyIdToken(idToken)
			.then((decodedToken) => {
				req.user = decodedToken;
				return db
					.collection('users')
					.where('uid', '==', req.user.uid)
					.limit(1)
					.get();
			})
			.then((data) => {
				req.user.uniqueName = data.docs[0].data().uniqueName;
				req.user.avatarUrl = data.docs[0].data().avatarUrl;
				req.user.roles = data.docs[0].data().roles;
				return next();
			})
			.catch((err) => {
				console.error('Error while verifying token ', err);
				return res.status(403).json(err);
			});
	},

	authUpdateUser: (req, res, next) => {
		// User A can't update user B, except where A has userAdmin role
		// Can only change own role if userAdmin and not removing userAdmin role
		// Can't change uid, uniqueName, createdOn of any user
		console.log('authUpdateUser req ', req);
		return next();
	}

};
