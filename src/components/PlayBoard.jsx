import React from 'react';
import PlayerStatus from './PlayerStatus';
import { STYLES } from './assets/styling';

function handleDrop(event) {
  let ficha = event.dataTransfer.getData('ficha');
  console.log('dropped: ', ficha); //eslint-disable-line no-console
}

function PlayBoard() {
  return (
    <div
      style={STYLES.board}
      className="board"
      onDrop={event => {
        handleDrop(event);
      }}
      onDragOver={event => {
        event.preventDefault();
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
