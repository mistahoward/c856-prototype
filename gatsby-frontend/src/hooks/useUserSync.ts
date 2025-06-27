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

export const useUserSync = () => {
	const { currentUser } = useAuth();
	const [createUser] = useMutation(CREATE_USER);
	const [updateUser] = useMutation(UPDATE_USER);

	useEffect(() => {
		if (currentUser) {
			const syncUser = async () => {
				try {
					// TODO: Check if user exists in backend
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
						console.log('User already exists in backend');
					} else {
						console.error('Error syncing user:', error);
					}
				}
			};

			syncUser();
		}
	}, [currentUser, createUser, updateUser]);
};
