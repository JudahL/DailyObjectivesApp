import React from 'react';
import { PropTypes } from 'prop-types';

export default function SignInError(props) {
  const { errorMessage } = props;

  return (
    errorMessage !== ''
      ? (
        <p className="SignInForm-error">
          {errorMessage}
        </p>
      ) : null
  );
}

SignInError.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};
