import firebase from 'firebase';
import c from '../constants';

const { firebaseConf, types, gameStart } = c;

firebase.initializeApp(firebaseConf);

export const startGame = gameId => {
  const newGameStart = gameStart;

  firebase
    .database()
    .ref(`${gameId}`)
    .set(newGameStart);

  return dispatch => {
    dispatch(loadAllPlayer(newGameStart.players, gameId));
  };
};

export const loadAllPlayer = (players, gameId) => ({
  type: types.LOAD_ALL_PLAYERS,
  players,
  gameId
});

export const watchHand = (gameId, player) => {
  return dispatch => {
    firebase
      .database()
      .ref(`${gameId}/players/${player}`)
      .on('child_added', data => {
        dispatch(refreshHand(data.val(), player));
      });
  };
};

export const refreshHand = (ficha, player) => ({
  type: types.REFRESH_HAND,
  ficha,
  player
});
