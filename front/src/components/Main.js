import React, { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/react-hooks';
import {
    TODO_LIST_QUERY,
    DELETE_TODO_MUTATION,
    TOGGLE_TODO_MUTATION,
} from '../querys';

const Main = _ => {
    const { data, loading } = useQuery(TODO_LIST_QUERY);
    const [removeTodo] = useMutation(DELETE_TODO_MUTATION);
    const [toggleTodo] = useMutation(TOGGLE_TODO_MUTATION);

    const [todos, setTodos] = useState([]);

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

    if (loading) {
        return <h4> Loading ...</h4>;
    }

    return todos && todos.length ? (
        <section className="main">
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
                        <li
                            key={todo.id}
                            className={todo.completed ? 'completed' : undefined}
                        >
                            <div className="view">
                                <input
                                    className="toggle"
                                    onChange={() =>
                                        toggleTodo({
                                            variables: {
                                                id: todo.id,
                                                completed: !todo.completed,
                                            },
                                            refetchQueries: [
                                                { query: TODO_LIST_QUERY },
                                            ],
                                        })
                                    }
                                    checked={todo.completed}
                                    type="checkbox"
                                />
                                <label>{todo.text}</label>
                                <button
                                    onClick={() =>
                                        removeTodo({
                                            variables: { id: todo.id },
                                            refetchQueries: [
                                                { query: TODO_LIST_QUERY },
                                            ],
                                        })
                                    }
                                    className="destroy"
                                />
                            </div>
                            {/* <input
                                className="edit"
                                onChange={() => {}}
                                value={todo.text}
                            /> */}
                        </li>
                    ))}
            </ul>
        </section>
    ) : null;
};
export default Main;
