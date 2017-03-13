import { combineReducers } from 'redux';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { reducer as formReducer } from 'redux-form'

const networkInterface = createNetworkInterface({ uri: 'http://localhost:3030/graphql' });

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    req.options.headers.authorization = ''
    next();
  },
}]);

export const client = new ApolloClient({
  networkInterface,
});


export const rootReducer = combineReducers({
  apollo: client.reducer(),
  form: formReducer,  
});
