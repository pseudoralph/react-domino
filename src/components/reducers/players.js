import clonedeep from 'lodash.clonedeep';
import initialState from './initialState';
import * as types from '../constants/actionTypes';
// import { v4 } from 'uuid';

const players = (state = { p1: {}, p2: {}, p3: {}, p4: {} }, action) => {
  let newState = clonedeep(state);

  switch (action.type) {
    case types.LOAD_ALL_PLAYERS:
      console.log(action);
      return action.players;

    case types.MAKE_MOVE:
      // debugger;
      console.log(action);
      return state;

    case types.REFRESH_HAND:
      // console.log(newState[action.player].length);
      // console.log(action.ficha.value);

      newState[action.player].length
        ? newState[action.player].push(action.ficha)
        : (newState[action.player] = [action.ficha]);
      return newState;

    default:
      return state;
  }
};

export default players;
