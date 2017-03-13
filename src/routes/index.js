import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import {
  Text
} from 'react-native';

import Signup from './Signup';
import Login from './Login';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="signup" component={Signup} title="Sign up" hideNavBar/>
          <Scene key="login" component={Login} title="Login" initial={true} hideNavBar/>
        </Scene>
      </Router>
    )
  }
}
