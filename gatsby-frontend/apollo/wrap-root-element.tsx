import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from './client';
import { AuthProvider } from '../src/contexts/AuthContext';
import { UserSync } from '../src/components/user-sync';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const wrapRootElement = ({ element }: { element: React.ReactNode }) => (
	<ApolloProvider client={client}>
		<AuthProvider>
			<UserSync />
			{element}
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</AuthProvider>
	</ApolloProvider>
);
