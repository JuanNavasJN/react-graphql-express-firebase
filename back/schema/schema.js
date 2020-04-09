const {
    GraphQLSchema,
    GraphQLID,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLBoolean,
    GraphQLInputObjectType,
} = require('graphql');

const Todo = require('../models/todo');
const User = require('../models/user');

const TodoType = new GraphQLObjectType({
    name: 'Todo',
    fields: () => ({
        id: { type: GraphQLID },
        text: { type: GraphQLString },
        completed: { type: GraphQLBoolean },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    }),
});

const TodoCreateInput = new GraphQLInputObjectType({
    name: 'TodoCreateInput',
    fields: () => ({
        text: { type: GraphQLString },
        completed: { type: GraphQLBoolean },
    }),
});

const TodosList = new GraphQLObjectType({
    name: 'TodosList',
    fields: () => ({
        items: { type: GraphQLList(TodoType) },
    }),
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        todo: {
            type: TodoType,
            args: {
                id: { type: GraphQLID },
            },
            resolve(parent, args) {
                return Todo.findTodoById(args.id);
            },
        },
        todosList: {
            type: TodosList,
            args: {
                orderBy: { type: GraphQLInputObjectType },
            },
            async resolve(parent, args) {
                console.log('orderBy', args.orderBy);
                return await { items: Todo.getAllTodos() };
            },
        },
        user: {
            type: UserType,
            args: {
                id: { type: GraphQLID },
            },
            resolve(parent, args) {
                return User.findUserById(args.id);
            },
        },
        users: {
            type: GraphQLList(UserType),
            resolve(parent, args) {
                return User.getAllUsers();
            },
        },
    },
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString },
            },
            resolve(parent, args) {
                let user = new User({
                    name: args.name,
                    email: args.email,
                });
                return user.save();
            },
        },
        todoCreate: {
            type: TodoType,
            args: {
                data: { type: TodoCreateInput },
            },
            resolve(parent, args) {
                let todo = new Todo({
                    text: args.data.text,
                    completed: args.data.completed,
                    createdAt: String(new Date().getTime()),
                    updatedAt: String(new Date().getTime()),
                });
                return todo.save();
            },
        },
        updateTodo: {
            type: TodoType,
            args: {
                id: { type: GraphQLID },
                text: { type: GraphQLString },
            },
            resolve(parent, args) {
                return Todo.updateTodo(args);
            },
        },
        addUserToTodo: {
            type: TodoType,
            args: {
                id: { type: GraphQLID },
                userid: { type: GraphQLID },
            },
            async resolve(parent, args) {
                await Todo.addUserToTodo(args);
                return await Todo.findTodoById(args.id);
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
