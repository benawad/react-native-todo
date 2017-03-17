import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import {
  List,
  ListItem
} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

class Menu extends React.Component {

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#ededed'}}>
        <List containerStyle={{marginBottom: 20}}>
          <ListItem
            key={-2}
            title={<Text>{this.props.user.email || ''}</Text>}
          />
          <ListItem
            key={-3}
            title='Logout'
            onPress={() => {
              Actions.login({});
              this.props.logout();
            }}
          />
        </List>
      </View>
    );
  }
}

const simpleMenu = () => (
  <View>
    <Text>Please work!</Text>
  </View>
);

export default Menu;
