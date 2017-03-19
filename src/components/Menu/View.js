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
import TodoListForm from './components/TodoListForm';

class Menu extends React.Component {

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#ededed'}}>
        <List containerStyle={{marginBottom: 20}}>
          <ListItem
            key={-2}
            title={<Text>{this.props.user.email || ''}</Text>}
          />
          {
            this.props.todoLists.map((tl, i) => (
              <ListItem
                key={i}
                title={tl.name}
                onPress={() => this.props.changeList(i)}
              />
            ))
          }
          <ListItem
            key={-3}
            title='Logout'
            onPress={() => {
              Actions.login({});
              this.props.logout();
            }}
          />
          <ListItem
            key={-4}
            title='Sign up'
            onPress={() => {
              Actions.signup({});
            }}
          />
        </List>
        <TodoListForm />
      </View>
    );
  }
}


export default Menu;
