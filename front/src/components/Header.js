import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { CREATE_TODO_MUTATION, TODO_LIST_QUERY } from '../querys';

const Header = _ => {
    const [state, setState] = useState({ text: '' });
    const [createTodo] = useMutation(CREATE_TODO_MUTATION);

    return (
        <header className="header">
            <h1>todos</h1>
            <input
                className="new-todo"
                onChange={({ target }) => setState({ text: target.value })}
                onKeyPress={({ key }) => {
                    if (key === 'Enter') {
                        const { text } = state;
                        createTodo({
                            variables: { data: { text, completed: false } },
                            refetchQueries: [{ query: TODO_LIST_QUERY }],
                        });

                        setState({ text: '' });
                    }
                }}
                value={state.text}
                placeholder="What needs to be done?"
            />
        </header>
    );
};

export default Header;
