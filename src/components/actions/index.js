import firebase from 'firebase';
import c from '../constants';

const { firebaseConf, types, gameStart } = c;

firebase.initializeApp(firebaseConf);

export const startGame = gameId => {
  const randomizedFichas = gameStart;

  firebase
    .database()
    .ref(`${gameId}`)
    .set(randomizedFichas);

  return dispatch => {
    dispatch(sendNewFichas(randomizedFichas, gameId));
  };
};

// export const addPlayer = (gameId, playerId) => {
//   console.log('no players to add');
// firebase
//   .database()
//   .ref(`${gameId}/players/${playerId}`)
//   .set([1, 2, 3, 4, 5, 6]);
// };

export const sendNewFichas = (fichas, gameId) => ({
  type: types.SEND_NEW_FICHAS,
  unusedFichas: fichas,
  gameId
});

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
