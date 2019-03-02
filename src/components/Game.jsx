import React from 'react';
import PlayBoard from './PlayBoard';
import Hand from './Hand';

import { STYLES } from './assets/styling';
import { buildFichaSet } from './buildFichaSet';

// REDUX STATE GOES HERE

const getFichas = () => {
  const getRandom = set => {
    return Math.floor(Math.random() * Math.floor(set.length));
  };

  let fichaSet = buildFichaSet();
  let randomlyBuiltFichaSet = [];

  for (let i = 0; i < 10; i++) {
    randomlyBuiltFichaSet.push(...fichaSet.splice(getRandom(fichaSet), 1));
  }

  return { myFichas: randomlyBuiltFichaSet, remainingFichas: fichaSet };
};

function Game() {
  return (
    <div style={STYLES.game}>
      <PlayBoard />
      <Hand fichas={getFichas().myFichas} />
    </div>
  );
}

export default Game;
