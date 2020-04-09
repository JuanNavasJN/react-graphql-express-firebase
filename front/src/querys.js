import gql from 'graphql-tag';

export const TODO_LIST_QUERY = gql`
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

export const CREATE_TODO_MUTATION = gql`
    mutation TodoCreate($data: TodoCreateInput!) {
        todoCreate(data: $data) {
            id
            text
            completed
        }
    }
`;

export const TOGGLE_TODO_MUTATION = gql`
    mutation TodoToggle($id: ID!, $completed: Boolean!) {
        todoUpdate(filter: { id: $id }, data: { completed: $completed }) {
            id
            text
            completed
        }
    }
`;

export const DELETE_TODO_MUTATION = gql`
    mutation TodoDelete($id: ID!) {
        todoDelete(filter: { id: $id }) {
            success
        }
    }
`;
