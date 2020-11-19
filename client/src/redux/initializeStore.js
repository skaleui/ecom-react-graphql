import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { storeReducer } from './reducers/storeReducer';
import { authReducer } from './reducers/authReducer';

export const initializeStore = () => {
  const AppReducers = combineReducers({
    storeReducer,
    authReducer
  });

  const rootReducer = (state, action) => {
    return AppReducers(state, action);
  };

  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  let store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunk))
  );

  return store;
}