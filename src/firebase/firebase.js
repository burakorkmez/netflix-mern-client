import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyCGrxpQ2u3KLRex94mYf0dv55r2ApvmbkU',
	authDomain: 'netflix-mern-b2045.firebaseapp.com',
	projectId: 'netflix-mern-b2045',
	storageBucket: 'netflix-mern-b2045.appspot.com',
	messagingSenderId: '988098334834',
	appId: '1:988098334834:web:ca8cb1e8ae5481b01772eb',
};

firebase.initializeApp(firebaseConfig);
const projectStorage = firebase.storage();
const projectAuth = firebase.auth();
export { projectStorage, projectAuth };
