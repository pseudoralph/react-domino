import React from 'react';

const buildFichaSet = (dots = 9) => {
  let builtSet = [];

  for (let bottom = dots; bottom >= 0; bottom--) {
    for (let i = 0; i <= bottom; i++) {
      builtSet.push([i, bottom]);
    }
  }

  return builtSet;
};

function Ficha() {
  return <div>Ficha works!</div>;
}

export default Ficha;
