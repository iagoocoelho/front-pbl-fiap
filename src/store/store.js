import { createStore, applyMiddleware, compose } from 'redux';
import combinedReducers from './combinedReducers';
import rootSaga from './rootSagas';
import createSaga from 'redux-saga';
import { loadStateLocalStorage, saveStateLocalStorage } from 'common/utils';
import throttle from 'lodash/throttle';

const sagaMiddleware = createSaga()

const persistedState = loadStateLocalStorage();

const store = createStore(
  combinedReducers,
  persistedState,
  compose(
    applyMiddleware(sagaMiddleware),
  )
);

store.subscribe(throttle(() => {
  saveStateLocalStorage({
    ...store.getState()
  });
}, 1000));

sagaMiddleware.run(rootSaga)

export { store };