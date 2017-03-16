import React from 'react';
import TodoForm from './components/TodoForm';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { View } from 'react-native';
import { Button} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { List, ListItem } from 'react-native-elements'

class Home extends React.Component {

  componentDidMount() {
    this.props.subscribeToNewTodos();
  }

  render() {
    return (
      <View>
        <TodoForm {...this.props}/>
        <Button 
          title='Go to login'
          onPress={() => Actions.login({})}
        />
        <List>
          {
            this.props.todos.map((l, i) => (
              <ListItem
                key={i}
                title={l.text}
              />
            ))
          }
        </List>
      </View>
    );
  }
}

const viewerQuery = gql`
query($token: String!) {
  viewer(token: $token) {
    todos {
    	text
    }
  }
}
`;

const subscriptionGraphql = gql`
subscription {
  todoAdded {
    text
    complete
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
            props.ownProps.addTodo(subscriptionData.data.todoAdded);
            return prev;
          }
        });
      }
    };
  },
});

export default getViewer(Home);
