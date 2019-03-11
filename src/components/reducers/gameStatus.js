import * as types from '../constants/actionTypes';

const gameStatus = (
  state = { activePlayer: 'p1', unplayedBoard: true },
  action
) => {
  switch (action.type) {
    case types.UPDATE_GAME_STATUS:
      // console.log(action);
      return action.data;

    default:
      return state;
  }
};

export default gameStatus;
