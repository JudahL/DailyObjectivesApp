import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { NavLink } from 'react-router-dom';
import { addUser, clearUserErrors } from '../actions/userActions';
import SignInError from './SignInError';
import '../componentsCss/SignInForm.css';

class SignUpForm extends PureComponent {
  constructor() {
    super();

    this.handleAddUser = this.handleAddUser.bind(this);
  }

  componentDidMount() {
    this.props.clearUserErrors();
  }

  handleAddUser(e) {
    e.preventDefault();

    this.props.clearUserErrors();

    this.props.addUser({
      username: this.username.value,
      password: this.password.value,
      passwordConfirm: this.passwordConfirm.value,
    });
  }

  render() {
    const { usernameError, passwordError, fieldError } = this.props;

    return (
      <div className="SignInForm-container">
        <SignInError errorMessage={fieldError} />
        <form onSubmit={this.handleAddUser}>

          {/* Username */}
          <h3 className="SignInForm-title">
            Username
          </h3>
          <input className="SignInForm-input" type="text" ref={(c) => { this.username = c; }} />
          <SignInError errorMessage={usernameError} />

          {/* Password */}
          <h3 className="SignInForm-title">
            Password
          </h3>
          <input className="SignInForm-input" type="password" ref={(c) => { this.password = c; }} />
          <SignInError errorMessage={passwordError} />

          {/* Password Confirm */}
          <h3 className="SignInForm-title">
            Confirm Password
          </h3>
          <input className="SignInForm-input" type="password" ref={(c) => { this.passwordConfirm = c; }} />
          <SignInError errorMessage={passwordError} />

          {/* Register Button */}
          <button className="SignInForm-button" type="submit">
            Register
          </button>
        </form>
        <div className="SignInForm-option-container">
          <p className="SignInForm-option-desc">
            {'Already have an account? '}
            <NavLink to="/signin" className="SignInForm-option-link">
              Sign in
            </NavLink>
          </p>
        </div>
      </div>
    );
  }
}

SignUpForm.propTypes = {
  addUser: PropTypes.func.isRequired,
  usernameError: PropTypes.string.isRequired,
  passwordError: PropTypes.string.isRequired,
  fieldError: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.get('user'),
    usernameError: state.getIn(['errors', 'user', 'username']),
    passwordError: state.getIn(['errors', 'user', 'password']),
    fieldError: state.getIn(['errors', 'user', 'field']),
  };
}

export default connect(mapStateToProps, { addUser, clearUserErrors })(SignUpForm);
