import React from 'react';
import App from './App';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';

const { CLIENT_URI } = require('./config.json');

const httpLink = createHttpLink ({
    uri: CLIENT_URI
});

const client = new ApolloClient ({
    link: httpLink,
    cache: new InMemoryCache()
});

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)
