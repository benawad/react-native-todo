import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import {
  Text
} from 'react-native';

import Signup from './Signup';
import Login from './Login';
import Home from './Home';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="signup" component={Signup} title="Sign up" hideNavBar/>
          <Scene key="login" component={Login} title="Login" hideNavBar/>
          <Scene key="home" component={Home} title="Home" initial={true} hideNavBar/>
        </Scene>
      </Router>
    )
  }
}
