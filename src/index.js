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
import gql from 'graphql-tag';

import store from './store';
import Router from './routes';
import { client } from './reducers/index';

export default class AppContainer extends React.Component {

  constructor(props) {
    super(props);
    //this.props.getTokenFromStorage();
    //client.subscribeToMore({
      //document: gql`
        //subscription {
          //viewer(token: "") {
            //todos {
              //text,
              //complete
            //}
          //}
        //}
      //`,
      //variables: {
        
      //},
      //updateQuery: (prev, {subscriptionData}) => {
          //return; // Modify your store and return new state with the new arrived data
      //}
  //});
  }

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
