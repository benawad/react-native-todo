import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { FormLabel, FormInput, Button, FormValidationMessage } from 'react-native-elements'
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Home extends React.Component {
  render() {
    return (
      <Button
        title="Create todo"
        onPress={() => this.props.createTodo()} />
    );
  }
}

const createTodoMutation = gql`
mutation {
  createTodo(text: "first one", complete: true) {
    id
  }
}

`

const todoGraphql = graphql(createTodoMutation, {
  props: ({ ownProps, mutate }) => ({
    createTodo() {
      return mutate()
      .then(({ data }) => {
        console.log(data);
      });
    },
  }),
});

export default todoGraphql(Home);
