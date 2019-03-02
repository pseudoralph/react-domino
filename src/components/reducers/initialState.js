import chunk from 'lodash.chunk';
import { v4 } from 'uuid';
import { buildFichaSet } from '../buildFichaSet';

const getRandom = set => {
  return Math.floor(Math.random() * Math.floor(set.length));
};

const sortedFichas = () => {
  let fichaSet = buildFichaSet();
  let randomizedFichas = [];

  for (let i = 0; i < 55; i++) {
    randomizedFichas.push(...fichaSet.splice(getRandom(fichaSet), 1));
  }

  return randomizedFichas;
};

const initialState = () => {
  const diviedFichas = chunk(sortedFichas(), 10);

  return {
    fichasInPlay: {},
    playersFichas: {
      p1: diviedFichas[0].map(ficha => {
        return { value: ficha, fichaId: v4() };
      }),
      p2: diviedFichas[1].map(ficha => {
        return { value: ficha, fichaId: v4() };
      }),
      p3: diviedFichas[2].map(ficha => {
        return { value: ficha, fichaId: v4() };
      }),
      p4: diviedFichas[3].map(ficha => {
        return { value: ficha, fichaId: v4() };
      })
    },
    unplayedFichas: [
      ...diviedFichas[4].map(ficha => {
        return { value: ficha, fichaId: v4() };
      }),
      ...diviedFichas[5].map(ficha => {
        return { value: ficha, fichaId: v4() };
      })
    ]
  };
};

export default initialState;
