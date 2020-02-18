const { auth, authUpdateUser } = require('../util/auth');
const { userHandlers } = require('./userHandlers');

const registerUserRoutes = app => {
	app.post('/signup', userHandlers.signup);
	app.post('/signin', userHandlers.signin);
	app.post('/resetpassword', userHandlers.resetPassword);
	app.get('/user', auth, userHandlers.fetchAuthenticatedUser);
	app.post('/user/:uid', auth, authUpdateUser, userHandlers.updateUser);
	// app.get('/user/:uid', auth, userHandlers.fetchUserDetails);
	// app.post('/user/image', auth, userHandlers.uploadImage);
	// app.post('/user', auth, userHandlers.addUserDetails);
	// app.post('/notifications', auth, userHandlers.markNotificationsRead);
};

module.exports = { registerUserRoutes };
