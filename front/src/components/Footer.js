import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/react-hooks';
import { TODO_LIST_QUERY } from '../querys';

import { useLocation } from 'react-router-dom';

const Footer = _ => {
    const { data } = useQuery(TODO_LIST_QUERY);

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

    return todos.length ? (
        <footer className="footer">
            <span className="todo-count">
                <strong>0</strong> item left
            </span>
            <ul className="filters">
                <li>
                    <Link
                        className={
                            window.location.pathname === '/'
                                ? 'selected'
                                : undefined
                        }
                        to="/"
                    >
                        All
                    </Link>
                </li>
                <li>
                    <Link
                        className={
                            window.location.pathname === '/active'
                                ? 'selected'
                                : undefined
                        }
                        to="/active"
                    >
                        Active
                    </Link>
                </li>
                <li>
                    <Link
                        className={
                            window.location.pathname === '/completed'
                                ? 'completed'
                                : undefined
                        }
                        to="/completed"
                    >
                        Completed
                    </Link>
                </li>
            </ul>
            <button className="clear-completed">Clear completed</button>
        </footer>
    ) : null;
};

export default Footer;
