import React from 'react';
import Player from './Player';

function PlayerStatus() {
  return (
    <div className="status">
      <h3>PlayerStatus works!</h3>
      <Player name={'Ralph'} isComputer={false} />
      <Player name={'Computer'} isComputer={true} />
    </div>
  );
}

export default PlayerStatus;
