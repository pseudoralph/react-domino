import c from '../constants';

function boardRenderHelper(fichas) {
  const { fichasGrid } = c;
  let fichasArrangement = Array(fichasGrid.length).fill(null);

  Object.values(fichas).forEach(ficha => {
    fichasGrid.forEach((gridId, i) => {
      if (ficha.renderPos === gridId) {
        fichasArrangement[i] = ficha;
      }
    });
  });
  return fichasArrangement;
}

export default boardRenderHelper;
