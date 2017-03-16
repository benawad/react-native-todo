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
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class TodoItem extends React.Component {

  static propTypes = {
    id: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    complete: React.PropTypes.bool.isRequired,
    token: React.PropTypes.string.isRequired,
  };

  render() {
    return (
      <Card>
        <Grid>
          <Col size={75}>
            <Text>{this.props.text}</Text>
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

export default deleteTodo(TodoItem);
