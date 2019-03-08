import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import GameLoader from './GameLoader';
import reducers from './reducers/reducers';
import PlayBoard from './PlayBoard';
import Hand from './Hand';

import { STYLES } from './assets/styling';

// import randomWords from 'random-words';

const uniqueGameId = 'test-game';
// const game = firebase.database().ref(uniqueGameId);

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

store.subscribe(() => console.log(store.getState())); //eslint-disable-line no-console

function Game() {
  return (
    <div style={STYLES.game}>
      <Provider store={store}>
        <GameLoader gameId={uniqueGameId} />

        <PlayBoard gameId={uniqueGameId} />
        <Hand gameId={uniqueGameId} />
      </Provider>
    </div>
  );
}

export default Game;
