import { combineReducers } from 'redux';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { reducer as formReducer } from 'redux-form';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import { AsyncStorage } from 'react-native';

import login from './login';
import token from './token';

const wsClient = new SubscriptionClient('ws://localhost:5000/', { reconnect: true, });

const networkInterface = createNetworkInterface({ uri: 'http://localhost:3030/graphql' });

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient,
);

export const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
});

export const rootReducer = combineReducers({
  apollo: client.reducer(),
  form: formReducer,
  login,
  token,
});
