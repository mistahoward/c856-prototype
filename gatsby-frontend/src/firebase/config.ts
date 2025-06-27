import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

/**
 * Retrieves environment variables from multiple possible sources in order of preference:
 * 1. Node.js process.env (server-side)
 * 2. Window.__GATSBY_ENV__ (client-side Gatsby environment)
 * 3. Window.__ENV__ (client-side custom environment)
 *
 * @param key - The environment variable key to retrieve
 * @returns The environment variable value as a string, or undefined if not found
 *
 */
const getEnvVar = (key: string): string | undefined => {
	if (process.env[key]) return process.env[key];

	if (
		typeof window !== 'undefined' &&
		(window as any).__GATSBY_ENV__ &&
		(window as any).__GATSBY_ENV__[key]
	)
		return (window as any).__GATSBY_ENV__[key];

	if (
		typeof window !== 'undefined' &&
		(window as any).__ENV__ &&
		(window as any).__ENV__[key]
	)
		return (window as any).__ENV__[key];
	return undefined;
};

let app: any = null;
let auth: any = null;
let googleProvider: any = null;

if (typeof window !== 'undefined') {
	const envVars = [
		'GATSBY_FIREBASE_API_KEY',
		'GATSBY_FIREBASE_AUTH_DOMAIN',
		'GATSBY_FIREBASE_PROJECT_ID',
		'GATSBY_FIREBASE_STORAGE_BUCKET',
		'GATSBY_FIREBASE_MESSAGING_SENDER_ID',
		'GATSBY_FIREBASE_APP_ID',
	];

	const firebaseConfig = {
		apiKey: getEnvVar('GATSBY_FIREBASE_API_KEY'),
		authDomain: getEnvVar('GATSBY_FIREBASE_AUTH_DOMAIN'),
		projectId: getEnvVar('GATSBY_FIREBASE_PROJECT_ID'),
		storageBucket: getEnvVar('GATSBY_FIREBASE_STORAGE_BUCKET'),
		messagingSenderId: getEnvVar('GATSBY_FIREBASE_MESSAGING_SENDER_ID'),
		appId: getEnvVar('GATSBY_FIREBASE_APP_ID'),
	};

	const missingEnvVars = envVars.filter(envVar => !getEnvVar(envVar));

	if (missingEnvVars.length > 0) {
		const mockConfig = {
			apiKey: 'mock-api-key',
			authDomain: 'mock-project.firebaseapp.com',
			projectId: 'mock-project',
			storageBucket: 'mock-project.appspot.com',
			messagingSenderId: '123456789',
			appId: 'mock-app-id',
		};

		try {
			app = initializeApp(mockConfig);
			auth = getAuth(app);
			googleProvider = new GoogleAuthProvider();
		} catch (error) {
			console.error('Error initializing mock Firebase:', error);
		}
	} else {
		try {
			app = initializeApp(firebaseConfig);
			auth = getAuth(app);
			googleProvider = new GoogleAuthProvider();
			console.log('Firebase initialized successfully');
		} catch (error) {
			console.error('Error initializing Firebase:', error);
		}
	}
}

export { auth, googleProvider };
export default app;
