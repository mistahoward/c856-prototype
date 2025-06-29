import React, { useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import { toast } from 'react-toastify';
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

export const UserSync: React.FC = () => {
	const { currentUser, loading } = useAuth();
	const [createUser] = useMutation(CREATE_USER);
	const [updateUser] = useMutation(UPDATE_USER);

	useEffect(() => {
		if (loading) return;
		if (currentUser) {
			const syncUser = async () => {
				try {
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
					toast.success('Profile synchronized successfully!');
				} catch (error) {
					if (
						error instanceof Error &&
						error.message.includes('UNIQUE constraint failed')
					)
						console.log('User already exists in backend');
					else {
						console.error('Error syncing user:', error);
						toast.error('Failed to synchronize profile');
					}
				}
			};

			syncUser();
		}
	}, [currentUser, loading, createUser, updateUser]);

	return null;
};
