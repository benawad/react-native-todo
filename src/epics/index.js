import { fromPromise } from 'rxjs/observable/fromPromise';
import { Observable } from 'rxjs/Observable';
import { combineEpics } from 'redux-observable';
import { startSubmit, stopSubmit } from 'redux-form';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';

async function saveToken(token) {
  try {
    await AsyncStorage.setItem('@rntodo:token', token);
    console.log('token saved');
  } catch (error) {
    console.log('Error setting item for AsyncStorage');
    console.log(error);
  }
}

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

const saveTokenEpic = action$ =>
  action$.ofType('LOGIN_SUCCEEDED')
    .mergeMap(action =>
      fromPromise(saveToken(action.token))
        .map(x => ({
          type: 'SET_ITEM_SUCCEEDED',
        }))
    );

const checkIfSignedIn = action$ =>
  action$.ofType('CHECK_IF_SIGNED_IN')
    .mergeMap(action =>
      fromPromise(getToken())
        .map(token => {
          if (token === '') {
            Actions.login;
            return { type: 'NOT_SIGNED_IN' };
          } else {
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
);
