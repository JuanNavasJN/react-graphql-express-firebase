import gql from 'graphql-tag';

export const TODO_LIST_QUERY = gql`
    query TodoList {
        todosList(orderBy: [completed_ASC, createdAt_DESC]) {
            items {
                id
                text
                completed
                users
            }
        }
    }
`;

export const USERS_QUERY = gql`
    query Users {
        users {
            name
        }
    }
`;

export const USER_QUERY = gql`
    query GetUser($id: ID, $email: String, $password: String) {
        user(id: $id, email: $email, password: $password) {
            id
            logged
        }
    }
`;

export const ADD_USER_MUTATION = gql`
    mutation addUser($data: UserInput!) {
        addUser(data: $data) {
            id
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

export const ADD_USER_TO_TODO_MUTATION = gql`
    mutation AddUserToTodo($id: ID!, $user: String!) {
        addUserToTodo(id: $id, user: $user) {
            id
        }
    }
`;

export const REMOVE_USER_TODO_MUTATION = gql`
    mutation RemoveUserTodo($id: ID!, $user: String!) {
        removeUserTodo(id: $id, user: $user) {
            id
        }
    }
`;
