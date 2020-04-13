import React, { useState } from 'react';

import '../styles/login.css';
import { useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { USER_QUERY, ADD_USER_MUTATION } from '../querys';
import { useHistory } from 'react-router-dom';

export default function Login({ setAuth, isAuth }) {
    const history = useHistory();
    const [email, setEmail] = useState('');
    // const [errors, setErrors] = useState([
    //     'Email format invalid',
    //     'Password empty',
    // ]);
    const [errors, setErrors] = useState([]);
    const [showName, setShowName] = useState(false);
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState(undefined);
    const [pass, setPass] = useState(undefined);

    const [getUser, { data }] = useLazyQuery(USER_QUERY, {
        variables: { email, password: pass },
    });

    const [addUser] = useMutation(ADD_USER_MUTATION);

    useEffect(
        _ => {
            if (isAuth) {
                history.push('/');
            }
        },
        // eslint-disable-next-line
        [isAuth]
    );

    useEffect(
        _ => {
            // User not registered, show name field
            if (data && data.user === null) {
                setShowName(true);
            }

            if (data && data.user && data.user.logged === true) {
                // console.log('correct password');
                setAuth(true);
            } else if (data && data.user && data.user.logged === false) {
                errors.push('Incorrect password');
                setErrors([...errors]);
            }
        },
        // eslint-disable-next-line
        [data]
    );

    useEffect(
        _ => {
            setErrors([]);
        },
        [email, password, fullName]
    );

    const handleSubmit = async e => {
        e.preventDefault();

        if (errors.length > 0) {
            setErrors([]);
            return;
        }

        if (password === undefined) {
            errors.push('Password empty');
            setErrors([...errors]);
        }

        if (showName && fullName === '') {
            errors.push('Full name empty');
            setErrors([...errors]);
        }

        if (errors.length === 0) {
            // console.log('submit');

            if (showName) {
                // New user
                console.log('new user');
                const res = await addUser({
                    variables: {
                        data: {
                            name: fullName,
                            email,
                            password,
                        },
                    },
                });

                if (res.data.addUser.id) {
                    console.log('user registered');
                    setAuth(true);
                }
            } else {
                // Login
                setPass(password);
                getUser();
            }
        }
    };

    const handleBlurEmail = e => {
        let re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

        if (email === '') {
            errors.push('Email empty');
            setErrors([...errors]);
        } else if (!re.test(String(email).toLowerCase())) {
            errors.push('Email format invalid');
            setErrors([...errors]);
        } else {
            setErrors([]);
            // setShowName(true);
            getUser();
        }
    };

    return (
        <div className="login-container">
            <div className="login">
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        onBlur={handleBlurEmail}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                    />

                    {showName && (
                        <input
                            type="text"
                            placeholder="Full name"
                            onChange={e => setFullName(e.target.value)}
                        />
                    )}

                    {errors.length > 0 ? (
                        <div className="messages">
                            {errors.map((e, i) => (
                                <p key={i}>{e}</p>
                            ))}
                        </div>
                    ) : null}

                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}
