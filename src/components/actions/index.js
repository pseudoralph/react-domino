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

// export const sendNewFichas = (fichas, gameId) => ({
//   type: types.SEND_NEW_FICHAS,
//   unusedFichas: fichas,
//   gameId
// });

export const refreshHand = (ficha, player) => ({
  type: types.REFRESH_HAND,
  ficha,
  player
});

export const watchHand = gameId => {
  const player = 'p1';
  return dispatch => {
    firebase
      .database()
      .ref(`${gameId}/players/${player}`)
      .on('child_added', data => {
        dispatch(refreshHand(data.val(), player));
      });
  };
};
