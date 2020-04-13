import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import Login from './components/Login';

import './styles/todo.css';

const App = _ => {
    const [isAuth, setAuth] = useState(false);

    return (
        <Router>
            <Switch>
                <Route
                    exact
                    path="/login"
                    component={_ => Login({ isAuth, setAuth })}
                />

                {isAuth ? (
                    <Route
                        path="/"
                        component={_ => (
                            <div className="todoapp">
                                <Header />
                                <Main />
                                <Footer />
                            </div>
                        )}
                    />
                ) : (
                    <Redirect to="/login" />
                )}
            </Switch>
        </Router>
    );
};

export default App;
