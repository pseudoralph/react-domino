import c from '../constants';

function boardRenderHelper(fichas) {
  // const { fichas } = this.props;
  let fichasArrangement = [];

  c.fichasGrid.map(gridPos => {
    if (gridPos === Object.values(fichas)[0].renderPos) {
      fichasArrangement.push(Object.values(fichas)[0]);
    } else fichasArrangement.push(null);
  });

  return fichasArrangement;
}

export default boardRenderHelper;
