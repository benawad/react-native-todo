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

  constructor(props) {
    super(props);
    console.log('Constructed');
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#ededed', paddingTop: 50}}>
        <List containerStyle={{marginBottom: 20}}>
          <ListItem
            key={-3}
            title='Login'
            onPress={() => Actions.login({})}
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
