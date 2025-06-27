import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import fetch from "isomorphic-fetch";

const uri = process.env.GATSBY_API_URL || 'http://localhost:8787/';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri, fetch })
});