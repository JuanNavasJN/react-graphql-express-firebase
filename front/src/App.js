import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';

import 'todomvc-app-css/index.css';
import './App.css';

const App = _ => {
    return (
        <Router>
            <div className="todoapp">
                <Header />
                <Main />
                <Footer />
            </div>
        </Router>
    );
};

export default App;
