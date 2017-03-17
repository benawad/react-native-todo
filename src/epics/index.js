import { fromPromise } from 'rxjs/observable/fromPromise';
import { Observable } from 'rxjs/Observable';
import { combineEpics } from 'redux-observable';
import { startSubmit, stopSubmit } from 'redux-form';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';

import { saveToken, getToken } from '../helpers';

const saveTokenEpic = action$ =>
  action$.ofType('LOGIN_SUCCEEDED')
    .do(() => Actions.home({}))
    .mergeMap(action =>
      fromPromise(saveToken(action.token))
        .map(x => ({
          type: 'SET_ITEM_SUCCEEDED',
        }))
    );

const logoutEpic = action$ =>
  action$.ofType('LOGOUT')
    .mergeMap(action =>
      fromPromise(saveToken(''))
        .map(x => ({
          type: 'TOKEN_CLEARED',
        }))
    );

const checkIfSignedIn = action$ =>
  action$.ofType('CHECK_IF_SIGNED_IN')
    .mergeMap(action =>
      fromPromise(getToken())
        .map(token => {
          if (token === '') {
            Actions.login({});
            return { type: 'NOT_SIGNED_IN' };
          } else {
            Actions.home({});
            return { 
              type: 'ADD_TOKEN_TO_PROPS',
              token
            };
          }
        })
    );

export default combineEpics(
  saveTokenEpic,
  checkIfSignedIn,
  logoutEpic,
);
