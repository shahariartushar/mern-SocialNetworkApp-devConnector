import React, { Fragment, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert.js';
import { register } from '../../actions/auth.js';
//import axios from 'axios';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password === password2) {
      register({ name, email, password });

      // ---> using axios (this part is done in actions/auth.js file)
      //   const newUser = {
      //     name,
      //     email,
      //     password,
      //   };
      //   try {
      //     const config = {
      //       headers: {
      //         'Content-Type': 'application/json',
      //       },
      //     };
      //     const body = JSON.stringify(newUser);
      //     const res = await axios.post('api/users', body, config);
      //     console.log(res.data);
      //   } catch (err) {
      //     console.error(err.response.data);
      //   }
    } else {
      setAlert('Passwords do not match', 'danger');
    }
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create your account
      </p>
      <form
        onSubmit={(e) => onSubmit(e)}
        className='form'
      >
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
          <small className='form-text'>
            This site uses Gravatar, so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={(e) => onChange(e)}
            minLength='6'
          />
        </div>
        <input
          className='btn btn-primary'
          type='submit'
          value='Register'
        ></input>
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
