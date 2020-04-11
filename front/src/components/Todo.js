import React from 'react';

import { useMutation } from '@apollo/react-hooks';
import {
    TODO_LIST_QUERY,
    DELETE_TODO_MUTATION,
    TOGGLE_TODO_MUTATION,
} from '../querys';

export default function Todo({ todo, toggleModal }) {
    const [removeTodo] = useMutation(DELETE_TODO_MUTATION);
    const [toggleTodo] = useMutation(TOGGLE_TODO_MUTATION);

    const handleClick = name => {
        console.log('delete to: ', name, ' on: ', todo.id);
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
                    <li
                        className="user"
                        onClick={_ => handleClick('Juan Navas')}
                    >
                        J<span className="tooltiptext">Juan Navas</span>
                    </li>
                    <li
                        className="user"
                        onClick={_ => handleClick('Carlos Rua')}
                    >
                        C<span className="tooltiptext">Carlos Rua</span>
                    </li>
                    <li className="user" onClick={_ => handleClick('Roa Mun')}>
                        R<span className="tooltiptext">Roa Mun</span>
                    </li>
                    <li
                        className="user"
                        onClick={_ => handleClick('Carla Lon')}
                    >
                        C<span className="tooltiptext">Carla Lon</span>
                    </li>
                    <li className="user" onClick={_ => handleClick('Ale Gut')}>
                        A<span className="tooltiptext">Ale Gut</span>
                    </li>
                </ul>
            </div>
        </li>
    );
}
