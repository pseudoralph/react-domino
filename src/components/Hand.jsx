import React from 'react';
import Ficha from './Ficha';
import { STYLES } from './assets/styling';
import { buildFichaSet } from './buildFichaSet';

const getRandomFicha = set => {
  return Math.floor(Math.random() * Math.floor(set.length));
};

let fichaSet = buildFichaSet();
let randomlyBuiltFichaSet = [];

randomlyBuiltFichaSet.push(...fichaSet.splice(getRandomFicha(fichaSet), 1));
randomlyBuiltFichaSet.push(...fichaSet.splice(getRandomFicha(fichaSet), 1));
randomlyBuiltFichaSet.push(...fichaSet.splice(getRandomFicha(fichaSet), 1));
randomlyBuiltFichaSet.push(...fichaSet.splice(getRandomFicha(fichaSet), 1));
randomlyBuiltFichaSet.push(...fichaSet.splice(getRandomFicha(fichaSet), 1));
randomlyBuiltFichaSet.push(...fichaSet.splice(getRandomFicha(fichaSet), 1));
randomlyBuiltFichaSet.push(...fichaSet.splice(getRandomFicha(fichaSet), 1));
randomlyBuiltFichaSet.push(...fichaSet.splice(getRandomFicha(fichaSet), 1));
randomlyBuiltFichaSet.push(...fichaSet.splice(getRandomFicha(fichaSet), 1));
randomlyBuiltFichaSet.push(...fichaSet.splice(getRandomFicha(fichaSet), 1));

console.log(randomlyBuiltFichaSet);
console.log(fichaSet);

function Hand() {
  return (
    <div style={STYLES.activePlayersHand} className="activePlayersHand">
      <div style={STYLES.activePlayersHand.fichas}>
        {randomlyBuiltFichaSet.map(ficha => (
          <Ficha value={ficha} />
        ))}
      </div>
    </div>
  );
}

export default Hand;
