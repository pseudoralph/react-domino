import * as types from '../constants/actionTypes';

const gameStatus = (
  state = { activePlayer: 'p1', unplayedBoard: true },
  action
) => {
  switch (action.type) {
    case types.UPDATE_GAME_STATUS:
      return action.data;

    case types.TOGGLE_TURN:
      console.log(action);
      return state;

    default:
      return state;
  }
};

export default gameStatus;
