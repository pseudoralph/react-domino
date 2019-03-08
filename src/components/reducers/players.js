import clonedeep from 'lodash.clonedeep';
import initialState from './initialState';
import * as types from '../constants/actionTypes';

const players = (state = initialState().playersFichas, action) => {
  let newState = clonedeep(state);

  switch (action.type) {
    case types.LOAD_ALL_PLAYERS:
      return action.players;

    case types.MAKE_MOVE:
      console.log(action);
      return state;

    case types.REFRESH_HAND:
      newState[action.player]
        ? newState[action.player].push(action.ficha)
        : (newState[action.player] = [action.ficha]);
      return newState;

    default:
      return state;
  }
};

export default players;
