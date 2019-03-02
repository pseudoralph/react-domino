import React from 'react';
import { STYLES } from './assets/styling';
import PlayerStatus from './PlayerStatus';

function handleOnDrop(event) {
  // event.preventDefault();
  console.log(event);
}

function handleDragOver(event) {
  event.stopPropagation();
  return false;
  console.log('hi');
  // event.stopPropagation();
}

function PlayBoard() {
  return (
    <div
      style={STYLES.board}
      className="board"
      onDragOver={event => {
        handleDragOver(event);
      }}
      onDrop={event => {
        handleOnDrop(event);
      }}
    >
      <PlayerStatus />
      <div style={STYLES.board.playable}>
        <h3 style={{ textAlign: 'center' }}>PlayBoard works!</h3>
      </div>
    </div>
  );
}

export default PlayBoard;
