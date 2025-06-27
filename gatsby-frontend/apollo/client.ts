import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import fetch from "isomorphic-fetch";

const uri = process.env.GATSBY_API_URL || 'http://127.0.0.1:8787/';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri, fetch })
});