const { database } = require('../services/firebase');

// Create a todo
const todo = function (input) {
    this.save = function () {
        return new Promise(resolve => {
            database
                .ref('todos')
                .push(input)
                .then(res => {
                    resolve(Object.assign({ id: res.key }, input));
                })
                .catch(error => {
                    console.log('error', error);
                });
        });
    };
};
todo.findTodoById = id => {
    return new Promise(resolve => {
        database
            .ref('todos')
            .orderByKey()
            .equalTo(id)
            .once('value')
            .then(res => {
                resolve(Object.assign({ id: id }, res.val()[id]));
            })
            .catch(error => {
                console.log('error', error);
            });
    });
};
todo.getAllTodos = () => {
    return new Promise(resolve => {
        database
            .ref('todos')
            .orderByKey()
            .once('value')
            .then(res => {
                if (res.val()) {
                    // console.log(res.val());
                    resolve(
                        Object.keys(res.val()).map(key =>
                            Object.assign({ id: key }, res.val()[key])
                        )
                    );
                } else {
                    resolve(null);
                }
            })
            .catch(error => {
                console.log('error', error);
            });
    });
};

todo.updateTodo = todo =>
    new Promise(resolve => {
        database
            .ref('todos/' + todo.id)
            .set(todo)
            .then(res => resolve())
            .catch(error => {
                console.log('error', error);
            });
    });

todo.addUserToTodo = (id, user) =>
    new Promise(resolve => {
        database
            .ref('todos/' + id + '/users')
            .push(user)
            .then(res => {
                resolve();
            })
            .catch(error => {
                console.log('error', error);
            });
    });

todo.deleteById = id =>
    new Promise(resolve => {
        let todoRef = database.ref('todos/' + id);
        todoRef.remove();
        resolve({ success: true });
    });

module.exports = todo;
