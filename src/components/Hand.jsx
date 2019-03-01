import React from 'react';
import Ficha from './Ficha';
import { STYLES } from './assets/styling';

function Hand() {
  return (
    <div style={STYLES.activePlayersHand} className="activePlayersHand">
      <h3>Hand works!</h3>
      <Ficha />
    </div>
  );
}

export default Hand;
