import clonedeep from 'lodash.clonedeep';
import * as types from '../constants/actionTypes';

const players = (state = { p1: {}, p2: {} }, action) => {
  let newState = clonedeep(state);

  switch (action.type) {
    case types.LOAD_PLAYER:
      return { [action.player]: action.fichas };

    case types.REFRESH_HAND:
      console.log(action); //eslint-disable-line no-console

      // newState[action.player].length
      //   ? newState[action.player].push(action.ficha)
      //   : (newState[action.player] = [action.ficha]);
      return newState;

    default:
      return state;
  }
};

export default players;
