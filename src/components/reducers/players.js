import initialState from './initialState';
import types from '../constants';

const players = (state = initialState().playersFichas, action) => {
  switch (action.type) {
    case types.MAKE_MOVE:
      console.log(action);

      return state;

    default:
      return state;
  }
};

export default players;
