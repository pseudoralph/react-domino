import React from 'react';
import PlayBoard from './PlayBoard';
import PlayerStatus from './PlayerStatus';
import Hand from './Hand';

import { STYLES } from './assets/styling';

// REDUX STATE GOES HERE
//
// PLAYER'S HAND: { ...ETC  }

function Game() {
  return (
    <div style={STYLES.game}>
      <PlayBoard />
      <Hand />
    </div>
  );
}

export default Game;
