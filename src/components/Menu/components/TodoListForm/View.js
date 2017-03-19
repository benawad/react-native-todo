import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { 
  FormLabel,
  FormInput,
  Button,
  FormValidationMessage,
} from 'react-native-elements'
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const textField = ({ input: { onChange, ...otherProps }, meta: { touched, error } }) => (
  <View>
    <FormInput 
      onChangeText={onChange} 
      {...otherProps} />
    { touched && error &&  <FormValidationMessage>{ error }</FormValidationMessage> }
  </View>
);

const submit = ({ name='' }, createTodoList) => {
  const errors = {
    _error: 'Empty todo list!'
  }

  let error = false;

  if (!name.trim()) {
    errors.name = 'Required'
    error = true;
  }

  if (error) {
    throw new SubmissionError(errors);
  } else {
    createTodoList(name);
  }
}

const TodoListForm = ({ handleSubmit, createTodoList, toggleDrawer }) => {
  return (
    <View>
      <FormLabel>Add TodoList</FormLabel>
      <Field name='name' component={textField} />
      <Button 
        title='Create'
    onPress={handleSubmit(values => {
      submit(values, createTodoList);
      toggleDrawer();
    })} />
    </View>
  );
}

const createTodoListMutation = gql`
mutation($name: String!, $token: String!) {
  createTodoList(name: $name, token: $token) {
    name
  }
}
`;

const todoListGraphql = graphql(createTodoListMutation, {
  props: ({ ownProps, mutate }) => ({
    createTodoList(name) {
      return mutate({
        variables: {
          token: ownProps.token,
          name,
        }
      })
      .then(({ data }) => {
        console.log(data);
      });
    },
  }),
});

export default reduxForm({
  form: 'todoListForm',
})(todoListGraphql(TodoListForm));
