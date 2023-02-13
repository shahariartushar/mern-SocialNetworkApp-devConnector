import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar.js';
import Landing from './components/layout/Landing.js';
import Login from './components/auth/Login.js';
import Register from './components/auth/Register.js';
import './App.css';

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Routes>
          <Route
            exact
            path='/'
            element={<Landing />}
          />
        </Routes>
        <section className='container'>
          <Routes>
            <Route
              exact
              path='/register'
              element={<Register />}
            />
            <Route
              exact
              path='/login'
              element={<Login />}
            />
          </Routes>
        </section>
      </Fragment>
    </Router>
  );
};

export default App;
