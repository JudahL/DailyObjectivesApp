import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { NavLink } from 'react-router-dom';
import { signIn, clearUserErrors } from '../actions/userActions';
import SignInError from './SignInError';
import '../componentsCss/SignInForm.css';

class SignInForm extends PureComponent {
  constructor() {
    super();

    this.handleSignIn = this.handleSignIn.bind(this);
  }

  componentDidMount() {
    this.props.clearUserErrors();
  }

  handleSignIn(e) {
    e.preventDefault();

    this.props.clearUserErrors();

    this.props.signIn({
      username: this.username.value,
      password: this.password.value,
    });
  }

  render() {
    const { usernameError, passwordError, fieldError } = this.props;

    return (
      <div className="SignInForm-container">
        <SignInError errorMessage={fieldError} />
        <form onSubmit={this.handleSignIn}>

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

          {/* Sign In Button */}
          <button className="SignInForm-button" type="submit">
            Sign In
          </button>
        </form>
        <div className="SignInForm-option-container">
          <p className="SignInForm-option-desc">
            {"Don't have an account? "}
            <NavLink to="/signup" className="SignInForm-option-link">
              Sign up
            </NavLink>
          </p>
        </div>
      </div>
    );
  }
}

SignInForm.propTypes = {
  signIn: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, { signIn, clearUserErrors })(SignInForm);
