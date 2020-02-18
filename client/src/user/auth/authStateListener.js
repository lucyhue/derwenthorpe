import * as firebase from 'firebase/app';

export function startAuthStateListener() {

	let callback = null;
	let metadataRef = null;
	firebase.auth().onAuthStateChanged((user) => {
		console.log('onAuthStateChanged for user ', user);

		// Remove previous listener.
		if (callback) {
			metadataRef.off('value', callback);
		}

		// On user login add new listener.
		if (user) {
			// Check if refresh is required.
			metadataRef = firebase.database().ref(`metadata/${user.uid}/refreshTime`);
			callback = (snapshot) => {
				// Force refresh to pick up the latest custom claims changes.
				// Note this is always triggered on first call. Further optimization could be
				// added to avoid the initial trigger when the token is issued and already contains
				// the latest claims.
				user.getIdToken(true);
			};

			// Subscribe new listener to changes on that node.
			metadataRef.on('value', callback);
		}

	});

}
