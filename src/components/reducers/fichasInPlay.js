import * as types from '../constants/actionTypes';

const fichasInPlay = (state = {}, action) => {
  switch (action.type) {
    case types.REFRESH_BOARD:
      console.log(action);
      return action.fichas;
    default:
      return state;
  }
};

export default fichasInPlay;
