import React, { useEffect } from 'react';
// import { AppProvider, gql } from '8base-react-sdk';
// import { Query } from 'react-apollo';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const TODO_LIST_QUERY = gql`
    query TodoList {
        todosList(orderBy: [completed_ASC, createdAt_DESC]) {
            items {
                id
                text
                completed
            }
        }
    }
`;

const Todos = ({ data }) => {
    console.log('data', data);
    return (
        <div>
            <h5>Todos</h5>
        </div>
    );
};

export default function App() {
    const { data, loading, error } = useQuery(TODO_LIST_QUERY);

    useEffect(
        _ => {
            console.log(
                '---------------------------------------------------------'
            );
            console.log('data', data);
            console.log('loading', loading);
            console.log('error', error);
            console.log('/--------------------------------------------/');
        },
        [data, loading, error]
    );

    return <h1>Hello</h1>;
}
