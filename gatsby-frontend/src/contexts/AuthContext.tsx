import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from 'react';
import {
	User,
	signInWithPopup,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';

interface AuthContextType {
	currentUser: User | null;
	loading: boolean;
	signInWithGoogle: () => Promise<void>;
	logout: () => Promise<void>;
}

interface AuthProviderProps {
	children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined)
		throw new Error('useAuth must be used within an AuthProvider');
	return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	const signInWithGoogle = async () => {
		try {
			if (!auth || !googleProvider)
				throw new Error('Firebase not initialized');
			await signInWithPopup(auth, googleProvider);
		} catch (error) {
			console.error('Error signing in with Google:', error);
			throw error;
		}
	};

	const logout = async () => {
		try {
			if (!auth) throw new Error('Firebase not initialized');
			await signOut(auth);
		} catch (error) {
			console.error('Error signing out:', error);
			throw error;
		}
	};

	useEffect(() => {
		if (!auth) {
			setLoading(false);
			return;
		}

		const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		loading,
		signInWithGoogle,
		logout,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};
