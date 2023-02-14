import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import Navbar from './components/layout/Navbar.js';
import Landing from './components/layout/Landing.js';
import Login from './components/auth/Login.js';
import Register from './components/auth/Register.js';
import store from './store.js';
import Alert from './components/layout/Alert.js';
import './App.css';

const App = () => {
  return (
    <Provider store={store}>
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
            <Alert />
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
    </Provider>
  );
};

export default App;
