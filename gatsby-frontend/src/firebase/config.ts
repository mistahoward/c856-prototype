import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

let app: any = null;
let auth: any = null;
let googleProvider: any = null;

if (typeof window !== 'undefined') {
	console.log('window not undefined');
	const firebaseConfig = {
		apiKey: process.env.GATSBY_FIREBASE_API_KEY,
		authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
		projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
		storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
		messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
		appId: process.env.GATSBY_FIREBASE_APP_ID,
	};

	try {
		app = initializeApp(firebaseConfig);
		auth = getAuth(app);
		googleProvider = new GoogleAuthProvider();
		console.log('Firebase initialized successfully');
	} catch (error) {
		console.error('Error initializing Firebase:', error);
	}
}

export { auth, googleProvider };
export default app;
