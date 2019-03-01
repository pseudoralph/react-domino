import React from 'react';
import Ficha from './Ficha';
import { STYLES } from './assets/styling';

const buildFichaSet = (dots = 9) => {
  let builtSet = [];

  for (let bottom = dots; bottom >= 0; bottom--) {
    for (let i = 0; i <= bottom; i++) {
      builtSet.push([i, bottom]);
    }
  }

  return builtSet;
};

function Hand() {
  return (
    <div style={STYLES.activePlayersHand} className="activePlayersHand">
      <h3>Hand works!</h3>
      <Ficha value={[1, 1]} />
    </div>
  );
}

export default Hand;
