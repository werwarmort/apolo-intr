import React from 'react';
import ReactDOM from 'react-dom/client';
import {ChakraProvider} from '@chakra-ui/react';
import App from './widgets/App';
import './index.css';

import {ApolloClient, ApolloProvider} from "@apollo/client";
import {client} from "./shared/apollo/client";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ChakraProvider>
            <ApolloProvider client={client}>
                <App/>
            </ApolloProvider>
        </ChakraProvider>
    </React.StrictMode>
);
