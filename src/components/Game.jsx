import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducers from './reducers/reducers';
import PlayBoard from './PlayBoard';
import Hand from './Hand';

import { STYLES } from './assets/styling';

const store = createStore(reducers);
store.subscribe(() => {
  console.log(store.getStore()); //eslint-disable-line no-console
});

function validateMove() {} //eslint-disable-line no-unused-vars

function Game() {
  return (
    <div style={STYLES.game}>
      <Provider store={store}>
        <PlayBoard />
        <Hand />
      </Provider>
    </div>
  );
}

export default Game;
