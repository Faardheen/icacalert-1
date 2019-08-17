import React from 'react';
import { NativeRouter, Switch, Route } from 'react-router-native';

import Register from './Register';
import Login from './Login';
import LoginSuccess from './LoginSuccess';
import Observe from './Observe';
import Consent from './Consent';
import AlertContent from './AlertContent';
import Celebration from './Celebration';

export default class Routes extends React.Component {
  render() {
    return (
      <NativeRouter>
        <Switch>
          <Route exact={true} path='/' component={Register} />
          <Route exact={true} path='/login' component={Login} />
          <Route exact={true} path='/observe' component={Observe} />
          <Route exact={true} path='/login-success' component={LoginSuccess} />
          <Route exact={true} path='/alert' component={AlertContent} />
          <Route exact={true} path='/consent' component={Consent} />
          <Route exact={true} path='/celebration' component={Celebration} />
        </Switch>
      </NativeRouter>
    )
  }
}
