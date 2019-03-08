import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import GameLoader from './GameLoader';
import rootReducer from './reducers';

const combinedReducers = combineReducers(rootReducer);
const store = createStore(combinedReducers, applyMiddleware(thunkMiddleware));

// store.subscribe(() => console.log(store.getState())); //eslint-disable-line no-console

function Game() {
  return (
    <div>
      <Provider store={store}>
        <GameLoader />
      </Provider>
    </div>
  );
}

export default Game;
