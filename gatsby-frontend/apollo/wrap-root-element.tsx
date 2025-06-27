import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from './client';
import { AuthProvider } from '../src/contexts/AuthContext';
import { UserSync } from '../src/components/user-sync';

export const wrapRootElement = ({ element }: { element: React.ReactNode }) => (
	<ApolloProvider client={client}>
		<AuthProvider>
			<UserSync />
			{element}
		</AuthProvider>
	</ApolloProvider>
);
