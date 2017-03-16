import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import login from './login';
import token from './token';

export const rootReducer = combineReducers({
  form: formReducer,
  login,
  token,
});
