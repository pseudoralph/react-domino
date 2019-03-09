import chunk from 'lodash.chunk';
import { v4 } from 'uuid';
import { buildFichaSet } from '../buildFichaSet';

const getRandom = set => {
  return Math.floor(Math.random() * Math.floor(set.length));
};

export const sortedFichas = () => {
  let fichaSet = buildFichaSet();
  let randomizedFichas = [];

  for (let i = 0; i < 55; i++) {
    randomizedFichas.push(...fichaSet.splice(getRandom(fichaSet), 1));
  }

  return randomizedFichas;
};

const gameStart = () => {
  const diviedFichas = chunk(sortedFichas(), 10);

  return {
    players: {
      p1: diviedFichas[0].map(ficha => {
        return { value: ficha };
      }),
      p2: diviedFichas[1].map(ficha => {
        return { value: ficha };
      }),
      p3: diviedFichas[2].map(ficha => {
        return { value: ficha };
      }),
      p4: diviedFichas[3].map(ficha => {
        return { value: ficha };
      })
    },
    unplayedFichas: [
      ...diviedFichas[4].map(ficha => {
        return { value: ficha };
      }),
      ...diviedFichas[5].map(ficha => {
        return { value: ficha };
      })
    ]
  };
};

export default gameStart;
