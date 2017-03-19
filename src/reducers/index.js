import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import login from './login';
import token from './token';
import todos from './todos';
import user from './user';
import todoLists from './todoLists';
import currentList from './currentList';
import drawerOpen from './drawerOpen';

export const rootReducer = combineReducers({
  form: formReducer,
  login,
  token,
  todos,
  user,
  todoLists,
  currentList,
  drawerOpen,
});
