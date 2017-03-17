import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import {
  Text,
} from 'react-native';
import {
  SideMenu
} from 'react-native-elements';

import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import Loading from './Loading';
import Menu from '../components/Menu';
import NavBar from '../components/NavBar';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  render() {
    return (
      <SideMenu
       menu={<Menu/>}
       isOpen={this.state.isOpen} >
      <NavBar menuButtonClicked={() => {
        this.setState({ isOpen: !this.state.isOpen });
      }} />
        <Router>
          <Scene key="root">
            <Scene key="loading" component={Loading} title="Loading" initial hideNavBar />
            <Scene key="signup" component={Signup} title="Sign up" hideNavBar/>
            <Scene key="login" component={Login} title="Login" hideNavBar/>
            <Scene key="home" component={Home} title="Home" hideNavBar/>
          </Scene>
        </Router>
      </SideMenu>
    )
  }
}
