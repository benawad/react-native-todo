import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { 
  View,
  ScrollView, Text,
} from 'react-native'; import { Actions } from 'react-native-router-flux';
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
import ShareForm from './components/ShareForm';
import TodoItem from './components/TodoItem';
import Menu from '../../components/Menu';

class Home extends React.Component {

  setTodoListCalled = false;

  componentDidMount() {
    this.props.subscribeToNewTodos();
    this.props.subscribeToNewTodoLists();
  }

  componentWillReceiveProps(nextProps){
    if (!this.setTodoListCalled && !nextProps.viewer.loading && this.props.viewer.loading) {
      this.setTodoListCalled = true;
      const { viewer } = nextProps.viewer;
      this.props.setTodoLists([...viewer.todoLists, ...viewer.sharedTodoLists]);
      this.props.setUser({
        email: nextProps.viewer.viewer.email
      });
    }
  }

  render() {
    console.log(this.props.currentList);
    let listId = 0;
    let todos = []
    let name = '';
    if (this.props.todoLists.length) {
      const currTodoList = this.props.todoLists[this.props.currentList];
      name = currTodoList.name;
      listId = currTodoList.id;
      todos = currTodoList.todos;
    }
    return (
      <View>
        <Text>{name}</Text>
        <TodoForm listId={listId} {...this.props}/>
        <Button 
          title='Go to login'
          onPress={() => Actions.login({})}
        />
        <ScrollView>
          { 
            todos.map((t, i) => (
              <TodoItem 
                token={this.props.token}
                key={i}
                id={t.id}
                text={t.text} 
                complete={t.complete} />
            ))
          }
        </ScrollView>
        <ShareForm listId={listId} {...this.props}/>
      </View>
    );
  }
}

const viewerQuery = gql`
query($token: String!) {
  viewer(token: $token) {
    email
    todoLists {
      id
      name
      todos {
        id
        text
        complete
      }
    }
    sharedTodoLists {
      id
      name
      todos {
        id
        text
        complete
      }
    }
  }
}
`;

const newTodoListSubscription = gql`
subscription {
  todoListChanges {
    op
    todoList {
      id
      name
      todos {
        id
        text
        complete
      }
    }
  }
}
`;

const newTodosSubscription = gql`
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
      subscribeToNewTodoLists: params => {
        return props.viewer.subscribeToMore({
          document: newTodoListSubscription,
          updateQuery: (prev, { subscriptionData }) => {
            const { op, todoList } = subscriptionData.data.todoListChanges;
            if (op == 'created') {
              props.ownProps.addTodoList(todoList);
            } else if (op == 'deleted') {
              props.ownProps.deleteTodoList(todoList.id);
            }
            return prev;
          }
        });
      },
      subscribeToNewTodos: params => {
        return props.viewer.subscribeToMore({
          document: newTodosSubscription,
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
