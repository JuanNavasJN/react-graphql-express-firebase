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
                return { items };
            } else {
                return { items: await Todo.getAllTodos() };
            }
        },
        async user(_, { id }) {
            return await User.findUserById(id);
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
    },
};

module.exports = { resolvers };
