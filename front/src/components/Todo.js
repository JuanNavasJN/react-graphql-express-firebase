import React from 'react';

import { useMutation } from '@apollo/react-hooks';
import {
    TODO_LIST_QUERY,
    DELETE_TODO_MUTATION,
    TOGGLE_TODO_MUTATION,
    REMOVE_USER_TODO_MUTATION,
} from '../querys';

export default function Todo({ todo, toggleModal }) {
    const [removeTodo] = useMutation(DELETE_TODO_MUTATION);
    const [toggleTodo] = useMutation(TOGGLE_TODO_MUTATION);

    const [deleteUserOnTodo] = useMutation(REMOVE_USER_TODO_MUTATION);

    const handleClick = name => {
        // console.log('delete to: ', name, ' on: ', todo.id);
        deleteUserOnTodo({
            variables: { id: todo.id, user: name },
            refetchQueries: [{ query: TODO_LIST_QUERY }],
        });
    };

    return (
        <li key={todo.id} className={todo.completed ? 'completed' : undefined}>
            <div className="view">
                <input
                    className="toggle"
                    onChange={() =>
                        toggleTodo({
                            variables: {
                                id: todo.id,
                                completed: !todo.completed,
                            },
                            refetchQueries: [{ query: TODO_LIST_QUERY }],
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
                            refetchQueries: [{ query: TODO_LIST_QUERY }],
                        })
                    }
                    className="destroy"
                />
                <button
                    className="add-user"
                    onClick={_ => toggleModal(todo.id)}
                >
                    +
                </button>

                <ul className="users">
                    {todo.users &&
                        todo.users.map((i, idx) => (
                            <li
                                className="user"
                                onClick={_ => handleClick(i)}
                                key={idx}
                            >
                                {i.split('')[0].toUpperCase()}
                                <span className="tooltiptext">{i}</span>
                            </li>
                        ))}
                </ul>
            </div>
        </li>
    );
}
