import React, { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/react-hooks';
import {
    TODO_LIST_QUERY,
    TOGGLE_TODO_MUTATION,
    USERS_QUERY,
    ADD_USER_TO_TODO_MUTATION,
} from '../querys';

import Todo from './Todo';

const Main = _ => {
    const { data, loading } = useQuery(TODO_LIST_QUERY);
    const { data: users } = useQuery(USERS_QUERY);

    const [toggleTodo] = useMutation(TOGGLE_TODO_MUTATION);
    const [addUserToTodo] = useMutation(ADD_USER_TO_TODO_MUTATION);

    const [todos, setTodos] = useState([]);
    const [modal, setModal] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [currentTodoId, setCurrentTodoId] = useState('');

    useEffect(
        _ => {
            if (users && users.usersList.items.length >= 0) {
                setAllUsers(users.usersList.items);
            }
        },
        [users]
    );

    useLocation();

    useEffect(
        _ => {
            if (data && data.todosList.items.length >= 0) {
                setTodos(data.todosList.items);
            }
        },
        [data]
    );

    const toggleAllTodos = ({ completed }) => {
        todos.forEach(todo => {
            toggleTodo({
                variables: { id: todo.id, completed },
                refetchQueries: [{ query: TODO_LIST_QUERY }],
            });
        });
    };

    const toggleModal = todoId => {
        setModal(!modal);

        if (typeof todoId === 'string') {
            setCurrentTodoId(todoId);
        }
    };

    const handleClick = async e => {
        const { innerText } = e.target;
        // console.log('agregar a: ', innerText, ' a esta tarea: ', currentTodoId);

        addUserToTodo({
            variables: { id: currentTodoId, user: innerText },
            refetchQueries: [{ query: TODO_LIST_QUERY }],
        });
        toggleModal();
    };

    if (loading) {
        return <h4> Loading ...</h4>;
    }

    return todos && todos.length ? (
        <section className="main">
            {modal && (
                <div className="modal">
                    <div className="modal-body">
                        <span className="modal-close" onClick={toggleModal}>
                            X
                        </span>

                        <ul>
                            {allUsers.map(e => (
                                <li onClick={handleClick} key={e.name}>
                                    {e.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            <input
                className="toggle-all"
                type="checkbox"
                onChange={() =>
                    todos.some(todo => todo.completed === false)
                        ? toggleAllTodos({ completed: true })
                        : toggleAllTodos({ completed: false })
                }
                checked={false}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <ul className="todo-list">
                {todos
                    .filter(todo => {
                        if (window.location.pathname === '/completed') {
                            return todo.completed;
                        }
                        if (window.location.pathname === '/active') {
                            return !todo.completed;
                        }
                        return true;
                    })
                    .map(todo => (
                        <Todo
                            key={todo.id}
                            todo={todo}
                            toggleModal={toggleModal}
                        />
                    ))}
            </ul>
        </section>
    ) : null;
};
export default Main;
