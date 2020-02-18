const admin = require('firebase-admin');
const { messageValidators } = require('./messageValidators');

const db = admin.firestore();

const messageHandlers = {

	upsertMessage: (req, res) => {
		if (req.body.body.trim() === '') {
			return res.status(400).json({ body: 'Body must not be empty' });
		}

		const newMessage = {
			body: req.body.body,
			userHandle: req.user.handle,
			userImage: req.user.imageUrl,
			createdAt: new Date().toISOString(),
			likeCount: 0,
			commentCount: 0
		};

		const { valid, errors } = messageValidators.validateMessage(newMessage);
		if (!valid) return res.status(400).json(errors);

		db.collection('messages')
			.add(newMessage)
			.then(doc => {
				const resMessage = newMessage;
				resMessage.messageId = doc.id;
				return res.json(resMessage);
			})
			.catch(err => {
				res.status(500).json({ error: 'something went wrong' });
				console.error(err);
			});
	},

	fetchMessage: (req, res) => {
		let messageData = {};
		db.doc(`/messages/${req.params.messageId}`)
			.get()
			.then(doc => {
				if (!doc.exists) {
					return res.status(404).json({ error: 'Message not found' });
				}
				messageData = doc.data();
				messageData.messageId = doc.id;
				return db
					.collection('comments')
					.orderBy('createdAt', 'desc')
					.where('messageId', '==', req.params.messageId)
					.get();
			})
			.then(data => {
				messageData.comments = [];
				data.forEach(doc => {
					messageData.comments.push(doc.data());
				});
				return res.json(messageData);
			})
			.catch(err => {
				console.error(err);
				res.status(500).json({ error: err.code });
			});
	},

	fetchAllMessages: (req, res) => {
		db.collection('messages')
			.orderBy('createdAt', 'desc')
			.get()
			.then(data => {
				let messages = [];
				data.forEach(doc => {
					messages.push({
						messageId: doc.id,
						body: doc.data().body,
						userHandle: doc.data().userHandle,
						createdAt: doc.data().createdAt,
						commentCount: doc.data().commentCount,
						likeCount: doc.data().likeCount,
						userImage: doc.data().userImage
					});
				});
				return res.json(messages);
			})
			.catch(err => {
				console.error(err);
				res.status(500).json({ error: err.code });
			});
	},

	deleteMessage: (req, res) => {
		const document = db.doc(`/messages/${req.params.messageId}`);
		document
			.get()
			.then(doc => {
				if (!doc.exists) {
					return res.status(404).json({ error: 'Message not found' });
				}
				if (doc.data().userHandle !== req.user.handle) {
					return res.status(403).json({ error: 'Unauthorized' });
				} else {
					return document.delete();
				}
			})
			.then(() => {
				return res.json({ message: 'Message deleted successfully' });
			})
			.catch(err => {
				console.error(err);
				return res.status(500).json({ error: err.code });
			});
	}

	// commentOnMessage: (req, res) => {
	// 	if (req.body.body.trim() === '')
	// 		return res.status(400).json({ comment: 'Must not be empty' });

	// 	const newComment = {
	// 		body: req.body.body,
	// 		createdAt: new Date().toISOString(),
	// 		messageId: req.params.messageId,
	// 		userHandle: req.user.handle,
	// 		userImage: req.user.imageUrl
	// 	};
	// 	console.log(newComment);

	// 	db.doc(`/messages/${req.params.messageId}`)
	// 		.get()
	// 		.then((doc) => {
	// 			if (!doc.exists) {
	// 				return res.status(404).json({ error: 'Message not found' });
	// 			}
	// 			return doc.ref.update({ commentCount: doc.data().commentCount + 1 });
	// 		})
	// 		.then(() => {
	// 			return db.collection('comments').add(newComment);
	// 		})
	// 		.then(() => {
	// 			res.json(newComment);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 			res.status(500).json({ error: 'Something went wrong' });
	// 		});
	// },

	// likeMessage: (req, res) => {
	// 	const likeDocument = db
	// 		.collection('likes')
	// 		.where('userHandle', '==', req.user.handle)
	// 		.where('messageId', '==', req.params.messageId)
	// 		.limit(1);

	// 	const messageDocument = db.doc(`/messages/${req.params.messageId}`);

	// 	let messageData;

	// 	messageDocument
	// 		.get()
	// 		.then((doc) => {
	// 			if (doc.exists) {
	// 				messageData = doc.data();
	// 				messageData.messageId = doc.id;
	// 				return likeDocument.get();
	// 			} else {
	// 				return res.status(404).json({ error: 'Message not found' });
	// 			}
	// 		})
	// 		.then((data) => {
	// 			if (data.empty) {
	// 				return db
	// 					.collection('likes')
	// 					.add({
	// 						messageId: req.params.messageId,
	// 						userHandle: req.user.handle
	// 					})
	// 					.then(() => {
	// 						messageData.likeCount++;
	// 						return messageDocument.update({ likeCount: messageData.likeCount });
	// 					})
	// 					.then(() => {
	// 						return res.json(messageData);
	// 					});
	// 			} else {
	// 				return res.status(400).json({ error: 'Message already liked' });
	// 			}
	// 		})
	// 		.catch((err) => {
	// 			console.error(err);
	// 			res.status(500).json({ error: err.code });
	// 		});
	// },

	// unlikeMessage: (req, res) => {
	// 	const likeDocument = db
	// 		.collection('likes')
	// 		.where('userHandle', '==', req.user.handle)
	// 		.where('messageId', '==', req.params.messageId)
	// 		.limit(1);

	// 	const messageDocument = db.doc(`/messages/${req.params.messageId}`);

	// 	let messageData;

	// 	messageDocument
	// 		.get()
	// 		.then((doc) => {
	// 			if (doc.exists) {
	// 				messageData = doc.data();
	// 				messageData.messageId = doc.id;
	// 				return likeDocument.get();
	// 			} else {
	// 				return res.status(404).json({ error: 'Message not found' });
	// 			}
	// 		})
	// 		.then((data) => {
	// 			if (data.empty) {
	// 				return res.status(400).json({ error: 'Message not liked' });
	// 			} else {
	// 				return db
	// 					.doc(`/likes/${data.docs[0].id}`)
	// 					.delete()
	// 					.then(() => {
	// 						messageData.likeCount--;
	// 						return messageDocument.update({ likeCount: messageData.likeCount });
	// 					})
	// 					.then(() => {
	// 						res.json(messageData);
	// 					});
	// 			}
	// 		})
	// 		.catch((err) => {
	// 			console.error(err);
	// 			res.status(500).json({ error: err.code });
	// 		});
	// },
};

module.exports = { messageHandlers };
