import React from 'react';
import { STYLES } from './assets/styling';
import PlayerStatus from './PlayerStatus';

function PlayBoard() {
  return (
    <div style={STYLES.board} className="board">
      <PlayerStatus />
      <div style={STYLES.board.playable}>
        <h3 style={{ textAlign: 'center' }}>PlayBoard works!</h3>
      </div>
    </div>
  );
}

export default PlayBoard;
