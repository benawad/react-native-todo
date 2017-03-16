import React from 'react';
import { 
  View,
  ScrollView,
  Text,
} from 'react-native';
import { 
  Card,
  List, 
  ListItem, 
  Icon,
  Grid,
  Col,
} from 'react-native-elements'
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

class TodoItem extends React.Component {

  static propTypes = {
    id: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    complete: React.PropTypes.bool.isRequired,
    token: React.PropTypes.string.isRequired,
  };

  render() {

    let textStyle = {};

    if (this.props.complete) {
      textStyle.textDecorationLine = 'line-through';
    }

    return (
      <Card>
        <Grid>
          <Col 
            onPress={() => this.props.updateTodo(this.props.id, this.props.text, !this.props.complete, this.props.token)} 
            size={75}>
            <Text
              style={textStyle}>
                {this.props.text}
            </Text>
          </Col>
          <Col size={25}>
            <Icon
              name='clear'
              color='#f50'
              onPress={() => this.props.deleteTodo(this.props.id, this.props.token)} />
          </Col>
        </Grid>
      </Card>
    );
  }
}

const deleteTodoMutation  = gql`
mutation($id: String!, $token: String!) {
  deleteTodo(id: $id, token: $token) {
    id
  }
}
`;


const deleteTodo = graphql(deleteTodoMutation, {
  props: ({ ownProps, mutate }) => ({
    deleteTodo(id, token) {
      return mutate({
        variables: {
          id,
          token,
        }
      });
    },
  }),
});

const updateTodoMutation  = gql`
mutation($id: String!, $text: String!, $complete: Boolean!, $token: String!) {
  updateTodo(id: $id, text: $text, complete: $complete, token: $token) {
    id
    text
    complete
  }
}
`;


const updateTodo = graphql(updateTodoMutation, {
  props: ({ ownProps, mutate }) => ({
    updateTodo(id, text, complete, token) {
      return mutate({
        variables: {
          id,
          text,
          complete,
          token,
        }
      });
    },
  }),
});

export default compose(
  deleteTodo,
  updateTodo
)(TodoItem);
