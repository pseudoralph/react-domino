import clonedeep from 'lodash.clonedeep';
import initialState from './initialState';

const reducer = (state = initialState(), action) => {
  const { fichaToMove, player } = action;
  let newState = clonedeep(state);

  switch (action.type) {
  case 'MAKE_MOVE':
    Object.values(newState.playersFichas[player]).map((val, i) => {
      if (val.fichaId === fichaToMove) {
        newState.fichasInPlay.concat(val);

        newState.playersFichas[player].splice(i, 1);
      }
    });

    return newState;

  default:
    return state;
  }
};

export default reducer;
