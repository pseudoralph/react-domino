import React from 'react';
import Player from './Player';
import { STYLES } from './assets/styling';

function PlayerStatus() {
  return (
    <div className="status" style={STYLES.status}>
      <Player name={'Ralph'} isComputer={false} />
      <Player name={'Computer'} isComputer={true} />
    </div>
  );
}

export default PlayerStatus;
