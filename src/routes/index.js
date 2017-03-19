import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import {
  Text,
} from 'react-native';
import {
  SideMenu
} from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import Loading from './Loading';
import Menu from '../components/Menu';
import NavBar from '../components/NavBar';

class Routes extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SideMenu
       menu={<Menu/>}
       isOpen={this.props.drawerOpen} >
      <NavBar menuButtonClicked={() => this.props.toggleDrawer()} />
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

const toggleDrawer = () => ({ type: 'TOGGLE_DRAWER' });

const mapStateToProps = (state, ownProps) => ({
  drawerOpen: state.drawerOpen,
});

const mapDispatchToProps = dispatch => (bindActionCreators({ toggleDrawer }, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
