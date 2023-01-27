import React from 'react';
import App from './App';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';

//For local development
//const { CLIENT_URI } = require('./config.json');

const CLIENT_URI = "https://parsing-tool-react.onrender.com/";

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
