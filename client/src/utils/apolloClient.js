import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { API_URL } from './Constants';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: API_URL
});

const client = new ApolloClient({
  cache,
  link
});

export default client;
