import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

import { ApolloProvider } from '@apollo/react-hooks';

const cache = new InMemoryCache();

// const API_ENDPOINT_URI = 'https://api.8base.com/ck7b04f94000508l0f5lrfo73';
const API_ENDPOINT_URI = 'http://localhost:8080/graphql';
// const API_ENDPOINT_URI = 'https://todo.juannavas.dev/graphql';

const link = new HttpLink({
    uri: API_ENDPOINT_URI,
});

const client = new ApolloClient({
    cache,
    link,
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
