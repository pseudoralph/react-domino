import firebase from 'firebase';
import c from '../constants';

const { firebaseConf, types, ranomSet } = c;

firebase.initializeApp(firebaseConf);

export const startGame = gameId => {
  const randomizedFichas = ranomSet;
  console.log('[ACTIONS] here i am');
  firebase
    .database()
    .ref(gameId)
    .set({ randomizedFichas });

  return dispatch => {
    dispatch(sendNewFichas(randomizedFichas));
  };
};

export const sendNewFichas = (fichas, game) => ({
  type: types.SEND_NEW_FICHAS,
  unusedFichas: fichas,
  game: game
});
