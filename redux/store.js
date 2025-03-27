import {createStore, applyMiddleware, compose} from 'redux';
import {createWrapper} from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';
import rootReducers from './rootReducers';
import rootSaga from './rootSaga';

export const makeStore = context => {
  // 1: Create the middleware
  const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  const sagaMiddleware = createSagaMiddleware();

  // 2: Add an extra parameter for applying middleware:
  const store = createStore(rootReducers, composeEnhancers(applyMiddleware(sagaMiddleware)));

  // 3: Run your sagas on server
  store.sagaTask = sagaMiddleware.run(rootSaga);

  // 4: now return the store:
  return store;
};

export const wrapper = createWrapper(makeStore, {
    serializeState: (state) => JSON.stringify(state),
	deserializeState: (state) => JSON.parse(state),
},);