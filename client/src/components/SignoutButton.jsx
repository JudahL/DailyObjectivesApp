import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { signOut } from '../actions/userActions';
import '../componentsCss/NavBar.css';

function SignoutButton(props) {
  const { user } = props;

  return (
    user !== ''
      ? (
        <button type="button" className="Nav-signout" onClick={() => props.signOut()}>
          Sign out
        </button>
      ) : null
  );
}

SignoutButton.defaultProps = {
  user: '',
};

SignoutButton.propTypes = {
  user: PropTypes.string,
  signOut: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.get('user'),
  };
}

export default connect(mapStateToProps, { signOut })(SignoutButton);
