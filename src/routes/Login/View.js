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

const submit = ({ email='', password='' }, login) => {
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
    login(email, password);
  }
}

const login = ({ handleSubmit, login }) => (
 <View>
    <FormLabel>Email</FormLabel>
    <Field name='email' component={textField} />
    <FormLabel>Password</FormLabel>
    <Field 
      name='password' 
      component={passwordField} />
    <Button 
      title='Login'
      onPress={handleSubmit(values => submit(values, login))} />
  </View>
);

const loginMutation = gql`
mutation ($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    data {
      email
    }
  }
}
`

const loginGraphql = graphql(loginMutation, {
  props: ({ ownProps, mutate }) => ({
    login(email, password) {
      return mutate({
        variables: {
          email,
          password,
        },
      })
      .then(data => {
        ownProps.loginSucceeded(data.data.login.token);
        ownProps.addTokenToProps(data.data.login.token);
      })
      .catch(err => {
        ownProps.loginFailed(err);
      });
    },
  }),
});

export default reduxForm({
  form: 'login',
})(loginGraphql(login));
