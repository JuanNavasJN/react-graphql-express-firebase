const Todo = require('../models/todo');
const User = require('../models/user');

// Sort for createdAt_DESC
function createdSortDesc(a, b) {
    const createdAtA = a.createdAt.toUpperCase();
    const createdAtB = b.createdAt.toUpperCase();

    let comparison = 0;
    if (createdAtA < createdAtB) {
        comparison = 1;
    } else if (createdAtA > createdAtB) {
        comparison = -1;
    }
    return comparison;
}

// Sort for createdAt_ASC
function createdSortAsc(a, b) {
    const createdAtA = a.createdAt.toUpperCase();
    const createdAtB = b.createdAt.toUpperCase();

    let comparison = 0;
    if (createdAtA > createdAtB) {
        comparison = 1;
    } else if (createdAtA < createdAtB) {
        comparison = -1;
    }
    return comparison;
}

// Sort for completed_ASC
function completedSort(a, b) {
    const completedA = a.completed;
    const completedB = b.completed;

    let comparison = 0;
    if (completedA > completedB) {
        comparison = 1;
    } else if (completedA < completedB) {
        comparison = -1;
    }
    return comparison;
}

const resolvers = {
    Query: {
        async todo(_, { id }) {
            return await Todo.findTodoById(id);
        },
        async todosList(_, { orderBy }) {
            if (orderBy) {
                let items = await Todo.getAllTodos();

                orderBy.forEach(s => {
                    if (s === 'createdAt_DESC') {
                        items.sort(createdSortDesc);
                    } else if (s === 'completed_ASC') {
                        items.sort(completedSort);
                    } else if (s === 'createdAt_ASC') {
                        items.sort(createdSortAsc);
                    }
                });

                // console.log('items', items);

                let newItems = items.map(i => {
                    if (!i.users) return i;
                    let users = [];
                    for (let key in i.users) users.push(i.users[key]);
                    i.users = users;
                    return i;
                });

                return { items: newItems };
            } else {
                let items = await Todo.getAllTodos();

                let newItems = items.map(i => {
                    if (!i.users) return i;
                    let users = [];
                    for (let key in i.users) users.push(i.users[key]);
                    i.users = users;
                    return i;
                });

                return { items: newItems };
            }
        },
        async user(_, { id, email, password }) {
            if (email && password) {
                const user = await User.findUserByEmail(email);

                if (user.password !== password) {
                    user.logged = false;
                    return user;
                } else {
                    user.logged = true;
                    return user;
                }
            } else if (id && !email) {
                return await User.findUserById(id);
            } else if (!id && email) {
                return await User.findUserByEmail(email);
            }
        },
        async users() {
            return await User.getAllUsers();
        },
    },
    Mutation: {
        async addUser(_, { data }) {
            let user = new User({
                name: data.name,
                email: data.email,
                password: data.password,
                createdAt: String(new Date().getTime()),
            });
            return await user.save();
        },
        async todoCreate(_, { data }) {
            let todo = new Todo({
                text: data.text,
                completed: data.completed,
                createdAt: String(new Date().getTime()),
                updatedAt: String(new Date().getTime()),
            });
            return await todo.save();
        },
        async todoUpdate(_, { filter, data }) {
            let todo = await Todo.findTodoById(filter.id);

            for (let key in data) {
                todo[key] = data[key];
            }

            todo.updatedAt = String(new Date().getTime());
            await Todo.updateTodo(todo);

            return todo;
        },
        async todoDelete(_, { filter }) {
            return await Todo.deleteById(filter.id);
        },
        async addUserToTodo(_, { id, user }) {
            let todo = await Todo.findTodoById(id);
            let exists = false;

            for (let key in todo.users) {
                if (todo.users[key] === user) {
                    exists = true;
                }
            }

            if (!exists) await Todo.addUserToTodo(id, user);

            todo = await Todo.findTodoById(id);

            let users = [];

            for (let key in todo.users) {
                users.push(todo.users[key]);
            }

            todo.users = users;

            return todo;
        },
        async removeUserTodo(_, { id, user }) {
            let todo = await Todo.findTodoById(id);

            let users = [];

            for (let key in todo.users) {
                users.push(todo.users[key]);
            }
            users = users.filter(e => e !== user);

            todo.users = users;
            todo.updatedAt = String(new Date().getTime());
            await Todo.updateTodo(todo);

            return todo;
        },
    },
};

module.exports = { resolvers };
