import { fromPromise } from 'rxjs/observable/fromPromise';
import { Observable } from 'rxjs/Observable';
import { combineEpics } from 'redux-observable';
import { startSubmit, stopSubmit } from 'redux-form';

import { AsyncStorage } from 'react-native';

async function saveToken(token) {
  try {
    await AsyncStorage.setItem('@rntodo:token', token);
  } catch (error) {
    console.log('Error setting item for AsyncStorage');
    console.log(error);
  }
}

const saveTokenEpic = action$ =>
  action$.ofType('LOGIN_SUCCEEDED')
    .mergeMap(action =>
      fromPromise(saveToken(action.response.token))
        .map(x => ({
          type: 'SET_ITEM_SUCCEEDED',
        }))
    );

export default combineEpics(
  saveTokenEpic
);
