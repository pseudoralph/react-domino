import constants from '../constants';
import clonedeep from 'lodash.clonedeep';
import initialState from './initialState';

const { types, firebaseConf } = constants;

const reducer = (state = initialState(), action) => {
  const { fichaToMove, player } = action;
  let newState = clonedeep(state);

  switch (action.type) {
    case types.MAKE_MOVE:
      Object.values(newState.playersFichas[player]).map((val, i) => {
        if (val.fichaId === fichaToMove) {
          newState.fichasInPlay.concat(val);

          newState.playersFichas[player].splice(i, 1);
        }
      });

      return newState;

    case types.SEND_NEW_FICHAS:
      console.log('[REDUCER]');
      return state;

    default:
      return state;
  }
};

export default reducer;
