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

const textField = ({ input: { onChange, ...otherProps }, meta: { touched, error } }) => (
  <View>
    <FormInput onChangeText={onChange} {...otherProps} />
    { touched && error &&  <FormValidationMessage>{ error }</FormValidationMessage> }
  </View>
);

const submit = ({ text='' }, createTodo) => {
  const errors = {
    _error: 'Empty todo!'
  }

  let error = false;

  if (!text.trim()) {
    errors.text = 'Required'
    error = true;
  }

  if (error) {
    throw new SubmissionError(errors);
  } else {
    createTodo(text, false);
  }
}

const Home = ({ handleSubmit, createTodo, checkIfSignedIn }) => {
  return (
    <View>
      <FormLabel>Todo</FormLabel>
      <Field name='text' component={textField} />
      <Button 
        title='Create'
        onPress={handleSubmit(values => submit(values, createTodo))} />
    </View>
  );
}

const createTodoMutation = gql`
mutation($text: String!, $complete: Boolean!, $token: String!) {
  createTodo(text: $text, complete: $complete, token: $token) {
    id
  }
}
`

const todoGraphql = graphql(createTodoMutation, {
  props: ({ ownProps, mutate }) => ({
    createTodo(text, complete) {
      console.log('Token:');
      console.log(ownProps.token);
      return mutate({
        variables: {
          token: ownProps.token,
          text,
          complete,
        }
      })
      .then(({ data }) => {
        console.log(data);
      });
    },
  }),
});

export default reduxForm({
  form: 'home',
})(todoGraphql(Home));
