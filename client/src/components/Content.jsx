import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getUser } from '../actions/userActions';
import SignedIn from './SignedIn';
import SignedOut from './SignedOut';
import '../componentsCss/Content.css';

class Content extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    const { user, location } = this.props;

    return (
      <div className="Content">
        <div className="Content-container">
          {/* passing location to SignedIn to force updates on browser location change */}
          {user === '' ? <SignedOut /> : <SignedIn location={location} />}
        </div>
      </div>
    );
  }
}

Content.defaultProps = {
  user: '',
};

Content.propTypes = {
  user: PropTypes.string,
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
  }).isRequired,
  getUser: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
  return {
    user: state.get('user'),
  };
}

export default connect(mapStateToProps, { getUser })(Content);
