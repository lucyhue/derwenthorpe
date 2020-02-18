const { auth } = require('../util/auth');
const { messageHandlers } = require('./messageHandlers');

const registerMessageRoutes = app => {
	app.post('/message', auth, messageHandlers.upsertMessage);
	app.get('/message/:id', messageHandlers.fetchMessage);
	app.get('/messages', messageHandlers.fetchAllMessages);
	app.delete('/message/:id', auth, messageHandlers.deleteMessage);
};

module.exports = { registerMessageRoutes };
