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
    <FormInput autoCapitalize='none' onChangeText={onChange} {...otherProps} />
    { touched && error &&  <FormValidationMessage>{ error }</FormValidationMessage> }
  </View>
);

const passwordField = ({ input: { onChange, ...otherProps }, meta: { touched, error } }) => (
  <View style={{ marginBottom: 30 }}>
    <FormInput onChangeText={onChange} {...otherProps} secureTextEntry />
    { touched && error &&  <FormValidationMessage>{ error }</FormValidationMessage> }
  </View>
);

const submit = ({ email='', password='' }, signUp) => {
  const errors = {
    _error: 'Login failed!'
  }

  let error = false;

  if (!email.trim()) {
    errors.email = 'Required'
    error = true;
  }
  
  if (!password.trim()) {
    errors.password = 'Required'
    error = true;
  }

  if (error) {
    throw new SubmissionError(errors);
  } else {
    signUp(email, password);
  }
}

const signup = ({ handleSubmit, signUp }) => (
 <View>
    <FormLabel>Email</FormLabel>
    <Field name='email' component={textField} />
    <FormLabel>Password</FormLabel>
    <Field 
      name='password' 
      component={passwordField} />
    <Button 
      title='Sign up'
      onPress={handleSubmit(values => submit(values, signUp))} />
  </View>
);

const signUpMutation = gql`
mutation ($email: String!, $password: String!) {
  signUp(email: $email, password: $password) {
    id
  }
}
`

const signUpGraphql = graphql(signUpMutation, {
  props: ({ ownProps, mutate }) => ({
    signUp(email, password) {
      return mutate({
        variables: {
          email,
          password,
        },
      })
      .then(({ data }) => {
        console.log(data);
      });
    },
  }),
});

export default reduxForm({
  form: 'signup',
})(signUpGraphql(signup));
