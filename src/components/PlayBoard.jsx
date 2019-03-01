import React from 'react';
import { STYLES } from './assets/styling';
import PlayerStatus from './PlayerStatus';

function dragon() {
  // event.preventDefault();

  console.log(event.dataTransfer.getData('ficha'));
}

function PlayBoard() {
  return (
    <div style={STYLES.board} className="board">
      <PlayerStatus />
      <div onDragEnter={() => dragon(event)} style={STYLES.board.playable}>
        <h3 style={{ textAlign: 'center' }}>PlayBoard works!</h3>
      </div>
    </div>
  );
}

export default PlayBoard;
