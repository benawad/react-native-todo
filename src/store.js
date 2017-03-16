import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import rootEpic from './epics';
import { rootReducer } from './reducers';

const epicMiddleware = createEpicMiddleware(rootEpic);

export default createStore(
  rootReducer,
  compose(
    applyMiddleware(epicMiddleware),
  )
);
