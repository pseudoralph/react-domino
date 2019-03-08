import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import GameLoader from './GameLoader';
import rootReducer from './reducers';
import PlayBoard from './PlayBoard';
import Hand from './Hand';

import { STYLES } from './assets/styling';

// import randomWords from 'random-words';

const uniqueGameId = 'test-game';

const combinedReducers = combineReducers(rootReducer);
const store = createStore(combinedReducers, applyMiddleware(thunkMiddleware));

store.subscribe(() => console.log(store.getState())); //eslint-disable-line no-console

// console.log(store.getState());

function Game() {
  return (
    <div style={STYLES.game}>
      <Provider store={store}>
        <GameLoader gameId={uniqueGameId} />
      </Provider>
    </div>
  );
}

export default Game;

// <PlayBoard gameId={uniqueGameId} />
// <Hand gameId={uniqueGameId} />
