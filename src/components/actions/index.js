import firebase from 'firebase';
import c from '../constants';
// import { sortedFichas } from '../constants/gameStart';
import { v4 } from 'uuid';

const { firebaseConf, types, gameStart } = c;

firebase.initializeApp(firebaseConf);

/// HELPER THAT CONVERTS ARRAYS BACK TO OBJECTS ///
const reconstructObject = inputArray => {
  const outputObject = {};
  inputArray.forEach(ficha => {
    outputObject[ficha.fichaId] = ficha;
  });
  return outputObject;
};

/// PLAYER INIT STARTS HERE ///
export const startGame = gameId => {
  const randomizedFichas = gameStart();
  const readySet = {};

  randomizedFichas.forEach(ficha => {
    const fichaId = v4();
    readySet[fichaId] = { value: ficha, fichaId };
  });
  return () => {
    firebase
      .database()
      .ref(`${gameId}/randomizedFichas`)
      .set(readySet);
  };
};

export const grabFichas = (gameId, player) => {
  return dispatch => {
    firebase
      .database()
      .ref(`${gameId}/randomizedFichas`)
      .once('value')
      .then(data => {
        dispatch(readyPlayer(gameId, player, data.val()));
      });
  };
};

export const readyPlayer = (gameId, player, randomizedFichas) => {
  const pullAt = require('lodash.pullat');
  let deckArray = [];

  Object.keys(randomizedFichas).map(ficha =>
    deckArray.push(randomizedFichas[ficha])
  );
  var playersFichas = pullAt(deckArray, [...Array(10).keys()]);

  return dispatch => {
    dispatch(updateRandomizedFichas(gameId, reconstructObject(deckArray)));
    dispatch(
      addFichasToPlayerDb(gameId, player, reconstructObject(playersFichas))
    );
    dispatch(
      addFichasToPlayerState(gameId, player, reconstructObject(playersFichas))
    );
  };
};

export const updateRandomizedFichas = (gameId, fichas) => {
  return () => {
    firebase
      .database()
      .ref(`${gameId}/randomizedFichas`)
      .set(fichas);
  };
};

export const addFichasToPlayerDb = (gameId, player, fichas) => {
  return () => {
    firebase
      .database()
      .ref(`${gameId}/player/${player}`)
      .set(fichas);
  };
};

export const addFichasToPlayerState = (gameId, player, fichas) => ({
  type: types.LOAD_PLAYER,
  gameId,
  player,
  fichas
});

/// PLAYER INIT STOPS HERE ///

export const watchHand = (gameId, player) => {
  return dispatch => {
    console.log('whatchHand [action] returned: ', player, gameId); //eslint-disable-line no-console
    firebase
      .database()
      .ref(`${gameId}/player/${player}`)
      .on('child_removed', data => {
        console.log('child_change event occured in firebase callback'); //eslint-disable-line no-console
        dispatch(refreshHand(data.val(), player));
      });
  };
};

export const refreshHand = (ficha, player) => ({
  type: types.REFRESH_HAND,
  ficha,
  player
});

export const makeMove = ficha => {
  console.log('[action]: ', ficha); //eslint-disable-line no-console
  const { fichaId, player, gameId } = ficha;

  return () => {
    firebase
      .database()
      .ref(`${gameId}/player/${player}/${fichaId}`)
      .remove();
  };

  // firebase
  //   .database()
  //   .ref('test-game/players/p1')
  //   .update('hji');

  return () => true;
};
