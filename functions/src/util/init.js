const admin = require('firebase-admin');
const firebase = require('firebase');
const app = require('express')();
const expressSanitizer = require('express-sanitizer');
const cors = require('cors');
const firebaseConfig = require('./config');

const initApp = () => {
	firebase.initializeApp(firebaseConfig);
	admin.initializeApp({
		credential: admin.credential.applicationDefault(),
		databaseURL: 'https://derwenthorpe-dra.firebaseio.com',
	});

	// allow cross domain requests
	app.use(cors({
		origin: 'http://localhost:3000'
	}));

	app.use(expressSanitizer());

	return app;
}

module.exports = { initApp };
