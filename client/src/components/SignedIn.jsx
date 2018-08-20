import React, { PureComponent, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getObjectives } from '../actions/objectivesActions';
import Modal from './Modal';
import Home from './Home';

class SignedIn extends PureComponent {
  componentWillMount() {
    this.props.getObjectives();
  }

  render() {
    return (
      <Fragment>
        <Modal />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/options" component={Home} />

          {/* Catch any other paths and redirect to '/' */}
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </Fragment>
    );
  }
}

SignedIn.propTypes = {
  getObjectives: PropTypes.func.isRequired,
};

export default connect(null, { getObjectives })(SignedIn);
