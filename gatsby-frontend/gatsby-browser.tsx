import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.GATSBY_API_URL || 'http://127.0.0.1:8787/',
  cache: new InMemoryCache(),
});

export const wrapRootElement = ({ element }: { element: React.ReactNode }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
);