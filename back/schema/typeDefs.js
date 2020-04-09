const gql = require('graphql-tag');

const typeDefs = gql`
    type Todo {
        id: ID
        text: String
        completed: Boolean
        createdAt: String
        updatedAt: String
    }

    input TodoCreateInput {
        text: String
        completed: Boolean
    }

    input UserInput {
        name: String!
        email: String!
    }

    input TodoKeyFilter {
        id: ID
    }

    input TodoUpdateInput {
        text: String
        completed: Boolean
    }

    type TodosList {
        items: [Todo]
    }

    type SuccessResponse {
        success: Boolean
    }

    type User {
        id: ID
        name: String
        email: String
    }

    enum Sorts {
        completed_ASC
        createdAt_DESC
        createdAt_ASC
    }

    type Query {
        todo(id: ID): Todo
        todosList(orderBy: [Sorts]): TodosList
        user(id: ID): User
        users: [User]
    }

    type Mutation {
        addUser(data: UserInput): User
        todoCreate(data: TodoCreateInput): Todo
        todoDelete(filter: TodoKeyFilter): SuccessResponse
        todoUpdate(filter: TodoKeyFilter, data: TodoUpdateInput): Todo
    }
`;

module.exports = { typeDefs };
