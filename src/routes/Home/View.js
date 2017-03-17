import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { 
  View,
  ScrollView,
  Text,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { 
  Button,
  Card,
  Icon,
  Grid,
  Col,
  SideMenu,
  List,
  ListItem,
} from 'react-native-elements'

import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import Menu from '../../components/Menu';

class Home extends React.Component {

  setTodosCalled = false;

  componentDidMount() {
    this.props.subscribeToNewTodos();
  }

  componentWillReceiveProps(nextProps){
    if (!this.setTodosCalled && !nextProps.viewer.loading && this.props.viewer.loading) {
      this.setTodosCalled = true;
      this.props.setTodos(nextProps.viewer.viewer.todos);
    }
  }

  render() {
    return (
      <View>
        <TodoForm {...this.props}/>
        <Button 
          title='Go to login'
          onPress={() => Actions.login({})}
        />
        <ScrollView>
          { 
            this.props.todos.map((t, i) => (
              <TodoItem 
                token={this.props.token}
                key={i}
                id={t.id}
                text={t.text} 
                complete={t.complete} />
            ))
          }
        </ScrollView>
      </View>
    );
  }
}

const viewerQuery = gql`
query($token: String!) {
  viewer(token: $token) {
    todos {
      id
    	text
      complete
    }
  }
}
`;

const subscriptionGraphql = gql`
subscription {
  todoChanges {
    op
    todo {
      id
      text
      complete
    }
  }
}
`;

const getViewer = graphql(viewerQuery, {
  name: 'viewer',
  options: ({ token }) => ({
    variables: {
        token,
    },
  }),
  props: props => {
    return {
      viewer: props.viewer,
      subscribeToNewTodos: params => {
        return props.viewer.subscribeToMore({
          document: subscriptionGraphql,
          updateQuery: (prev, { subscriptionData }) => {
            const { op, todo } = subscriptionData.data.todoChanges;
            if (op === 'created') {
              props.ownProps.addTodo(todo);
            } else if (op === 'deleted') {
              props.ownProps.deleteTodo(todo.id);
            } else if (op === 'updated') {
              props.ownProps.updateTodo(todo);
            }
            return prev;
          }
        });
      }
    };
  },
});

export default getViewer(Home);
