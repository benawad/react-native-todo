import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import { ApolloProvider } from 'react-apollo';
import 'rxjs';
import { Button } from 'react-native-elements'

import store from './store';
import Router from './routes';
import { client } from './reducers/index';

export default class AppContainer extends React.Component {
  render() {
    return (
      <ApolloProvider client={client} store={store}>
       <View style={{flex: 1}}>
          <StatusBar />
          <Router />
        </View>
      </ApolloProvider>
    );
  }
}
