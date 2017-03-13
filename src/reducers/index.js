import { combineReducers } from 'redux';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { reducer as formReducer } from 'redux-form';

import { AsyncStorage } from 'react-native';

import login from './login';

const networkInterface = createNetworkInterface({ uri: 'http://localhost:3030/graphql' });

async function getToken() {
 try {
    const value = await AsyncStorage.getItem('@rntodo:token');
    if (value !== null){
      return value;
    }
  } catch (error) {
    console.log(error);
    return '';
  } 
}

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    req.options.headers.authorization = getToken()
    next();
  },
}]);

export const client = new ApolloClient({
  networkInterface,
});


export const rootReducer = combineReducers({
  apollo: client.reducer(),
  form: formReducer,
  login,
});
