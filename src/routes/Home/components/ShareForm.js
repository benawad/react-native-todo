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
      autoCapitalize='none'
      {...otherProps} />
    { touched && error &&  <FormValidationMessage>{ error }</FormValidationMessage> }
  </View>
);

const submit = ({ email='' }, shareTodoList, listId) => {
  const errors = {
    _error: 'Empty shared user!'
  }

  let error = false;

  if (!email.trim()) {
    errors.email = 'Required'
    error = true;
  }

  if (error) {
    throw new SubmissionError(errors);
  } else {
    shareTodoList(listId, email);
  }
}

const ShareForm = ({ handleSubmit, shareTodoList, listId }) => {
  return (
    <View>
      <FormLabel>Share TodoList</FormLabel>
      <Field name='email' component={textField} />
      <Button 
        title='Share'
        onPress={handleSubmit(values => submit(values, shareTodoList, listId))} />
    </View>
  );
}

const shareTodoListMutation = gql`
mutation($listId: String!, $email: String!, $token: String!) {
  shareTodoList(listId: $listId, email: $email, token: $token) {
    userId
    listId
  }
}
`;

const shareTodoGraphql = graphql(shareTodoListMutation, {
  props: ({ ownProps, mutate }) => ({
    shareTodoList(listId, email) {
      return mutate({
        variables: {
          token: ownProps.token,
          email,
          listId,
        }
      }).then(data => console.log(data));
    },
  }),
});

export default reduxForm({
  form: 'shareForm',
})(shareTodoGraphql(ShareForm));
