import React from 'react';
import {
  StyleSheet, Text,
  View,
  ScrollView,
} from 'react-native';
import {
  List,
  ListItem
} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

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
                onPress={() => {
                  this.props.toggleDrawer();
                  this.props.changeList(i)
                }}
                onLongPress={() => {
                  this.props.deleteTodoList(tl.id, this.props.token);
                }}
              />
            ))
          }
          <ListItem
            key={-3}
            title='Logout'
            onPress={() => {
              this.props.toggleDrawer();
              Actions.login({});
              this.props.logout();
            }}
          />
          <ListItem
            key={-4}
            title='Sign up'
            onPress={() => {
              this.props.toggleDrawer();
              Actions.signup({});
            }}
          />
        </List>
        <TodoListForm />
      </View>
    );
  }
}

const deleteTodoListMutation  = gql`
mutation($id: String!, $token: String!) {
  deleteTodoList(id: $id, token: $token) {
    id
  }
}
`;


const deleteTodoList = graphql(deleteTodoListMutation, {
  props: ({ ownProps, mutate }) => ({
    deleteTodoList(id, token) {
      return mutate({
        variables: {
          id,
          token,
        }
      });
    },
  }),
});


export default deleteTodoList(Menu);
