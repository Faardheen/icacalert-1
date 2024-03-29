import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// add ip address of your machine
export const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://192.168.100.23:5000/graphql' }),
  cache: new InMemoryCache()
})