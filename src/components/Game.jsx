import React from 'react';
import PlayBoard from './PlayBoard';
import PlayerStatus from './PlayerStatus';
import Hand from './Hand';

// REDUX STATE GOES HERE
//
// PLAYER'S HAND: { ...ETC  }

function Game() {
  return (
    <div>
      <h1>Game Works</h1>
      <PlayBoard />
      <PlayerStatus />
      <Hand />
    </div>
  );
}

export default Game;
