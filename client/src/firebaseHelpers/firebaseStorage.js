import { buffers, eventChannel, END } from 'redux-saga';
import * as firebase from 'firebase/app';
import 'firebase/storage';

export const STORAGE_BUCKET_URL = 'https://firebasestorage.googleapis.com/v0/b/derwenthorpe-dra.appspot.com/o/';

export const firebaseStorage = {

	fileRef: (path) => firebase.storage().ref().child(path),

	getDownloadFileUrl: (path) => firebaseStorage.fileRef(path).getDownloadURL(),
	// Use as follows ...
	// const avatarUrl = useRef(null);
	// useEffect(() => {
	//   (async () => {
	//     avatarUrl.current = await firebaseStorage.getDownloadFileUrl(`avatars/${uniqueName}.png`).catch((error) => 'badUrl');
	//   })();
	// }, [uniqueName]);

	createUploadFileChannel: (fileDestinationPath, fileOrString) => {

		const handleProgress = (snapshot, emit) => {
			const uploadState = snapshot.state;
			const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			console.log(`Upload is ${uploadState} ${progress}% done`);
			emit({ uploadState, progress });
		}

		const handleError = (error, emit) => {
			console.error('something went wrong during upload ', error);
			emit({ error });
			emit(END);
		}

		const handleComplete = (emit) => {
			firebaseStorage
				.getDownloadFileUrl(fileDestinationPath)
				.then((downloadUrl) => {
					emit({ downloadUrl });
					emit(END);
				});
		}

		return eventChannel((emit) => {
			if (typeof fileOrString === 'string') {
				firebaseStorage
					.fileRef(fileDestinationPath)
					.putString(fileOrString, 'data_url')
					.on('state_changed',
						(snapshot) => handleProgress(snapshot, emit),
						(error) => handleError(error, emit),
						() => handleComplete(emit)
					);
			} else {
				firebaseStorage
					.fileRef(fileDestinationPath)
					.put(fileOrString)
					.on('state_changed',
						(snapshot) => handleProgress(snapshot, emit),
						(error) => handleError(error, emit),
						() => handleComplete(emit)
					);
			}

			// return unsubscribe function
			return () => { }
		}, buffers.sliding(2));
	},

}
