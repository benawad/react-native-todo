import React from 'react';
import {
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { ApolloProvider } from 'react-apollo';
import 'rxjs';
import { Button } from 'react-native-elements'
import gql from 'graphql-tag';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import ApolloClient, { createNetworkInterface } from 'apollo-client';

import store from './store';
import Router from './routes';
import { getToken } from './helpers';

const wsClient = new SubscriptionClient('ws://localhost:5000/subscriptions', { reconnect: true, });

const networkInterface = createNetworkInterface({ uri: 'http://localhost:3030/graphql' });

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient,
);

export const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
});

export default class AppContainer extends React.Component {
  render() {
    return (
      <ApolloProvider client={client} store={store}>
        <View style={{flex: 1}}>
          <Router />
        </View>
      </ApolloProvider>
    );
  }
}
