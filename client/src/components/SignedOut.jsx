import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';

export default function SignedOut() {
  return (
    <Switch>
      <Route exact path="/" component={SignInForm} />
      <Route path="/signup" component={SignUpForm} />
      <Route path="/signin" component={SignInForm} />

      {/* Catch any other paths and redirect to '/' */}
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  );
}
