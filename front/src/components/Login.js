import React from 'react';

import '../styles/login.css';

export default function Login() {
    return (
        <div className="login-container">
            <div className="login">
                <form>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <div className="messages"></div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}
