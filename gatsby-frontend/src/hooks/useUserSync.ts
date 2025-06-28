import { useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useAuth } from '../contexts/AuthContext';

const CREATE_USER = gql`
	mutation CreateUser($input: CreateUserInput!) {
		createUser(input: $input) {
			id
			firebaseId
			email
			displayName
			photoURL
		}
	}
`;

const UPDATE_USER = gql`
	mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
		updateUser(id: $id, input: $input) {
			id
			firebaseId
			email
			displayName
			photoURL
		}
	}
`;

/**
 * Custom hook that synchronizes Firebase user data with the backend database
 *
 * This hook automatically creates or updates user records in the backend when a user
 * signs in through Firebase authentication. It handles the synchronization process
 * by attempting to create a new user record, and if that fails due to a unique constraint
 * (indicating the user already exists), it logs the situation for future update implementation.
 *
 * @returns {void} This hook doesn't return any values
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   useUserSync(); // Automatically syncs user data when component mounts
 *   return <div>User sync is active</div>;
 * };
 * ```
 *
 * @dependencies
 * - Requires Firebase authentication context to be available
 * - Depends on GraphQL mutations for user creation and updates
 * - Automatically runs when currentUser changes
 *
 * @todo
 * - Implement user existence check before attempting creation
 * - Add proper user update functionality when user already exists
 * - Add error handling for network failures
 * - Consider adding retry logic for failed sync attempts
 */
export const useUserSync = () => {
	const { currentUser } = useAuth();
	const [createUser] = useMutation(CREATE_USER);
	const [updateUser] = useMutation(UPDATE_USER);

	useEffect(() => {
		if (!currentUser) return;
		const syncUser = async () => {
			try {
				// TODO: Check if user exists in backend
				console.log('useUserSync: Creating user in backend...');
				await createUser({
					variables: {
						input: {
							firebaseId: currentUser.uid,
							email: currentUser.email || '',
							displayName: currentUser.displayName || null,
							photoURL: currentUser.photoURL || null,
						},
					},
				});
			} catch (error) {
				if (
					error instanceof Error &&
					error.message.includes('UNIQUE constraint failed')
				) {
					// TODO: Update user in backend
					console.log('useUserSync: User already exists in backend');
				} else {
					console.error('useUserSync: Error syncing user:', error);
				}
			}
		};

		syncUser();
	}, [currentUser, createUser, updateUser]);
};
