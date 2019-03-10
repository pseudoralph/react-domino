import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import c from '../constants';
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
  const uplayedFichas = gameStart();
  const readySet = {};

  uplayedFichas.forEach(ficha => {
    const fichaId = v4();
    readySet[fichaId] = { value: ficha, fichaId };
  });
  return () => {
    firebase
      .database()
      .ref(`${gameId}/uplayedFichas`)
      .set(readySet);
  };
};

export const grabFichas = (gameId, player) => {
  return dispatch => {
    firebase
      .database()
      .ref(`${gameId}/uplayedFichas`)
      .once('value')
      .then(data => {
        dispatch(readyPlayer(gameId, player, data.val()));
      });
  };
};

export const readyPlayer = (gameId, player, uplayedFichas) => {
  const pullAt = require('lodash.pullat');
  let deckArray = [];

  Object.keys(uplayedFichas).map(ficha => deckArray.push(uplayedFichas[ficha]));
  var playersFichas = pullAt(deckArray, [...Array(10).keys()]);

  return dispatch => {
    dispatch(updateUnplayedFichas(gameId, reconstructObject(deckArray)));
    dispatch(
      addFichasToPlayerDb(gameId, player, reconstructObject(playersFichas))
    );
    dispatch(
      refreshPlayersFichas(gameId, player, reconstructObject(playersFichas))
    );
  };
};

export const updateUnplayedFichas = (gameId, fichas) => {
  return () => {
    firebase
      .database()
      .ref(`${gameId}/uplayedFichas`)
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

export const refreshPlayersFichas = (gameId, player, fichas) => ({
  type: types.REFRESH_FICHAS,
  gameId,
  player,
  fichas
});

/// PLAYER INIT STOPS HERE ///

export const watchHand = (gameId, player) => {
  return dispatch => {
    firebase
      .database()
      .ref(`${gameId}/player/${player}`)
      .on('child_removed', data => {
        console.log('this ficha removed', data.val());
        dispatch(placeFichaOnBoard(data.val(), gameId, player));
        dispatch(getPlayersFichasFromDb(player, gameId));
      });
  };
};

export const watchBoard = gameId => {
  return dispatch => {
    firebase
      .database()
      .ref(`${gameId}/board/fichas`)
      .on('child_added', data => {
        console.log('board is listening', data.val());
      });
  };
};

export const placeFichaOnBoard = (ficha, gameId, player) => {
  console.log(ficha, gameId, player);
  return dispatch => {
    firebase
      .database()
      .ref(`${gameId}/board/fichas`)
      .push({ ...ficha });
  };
};

export const getPlayersFichasFromDb = (player, gameId) => {
  return dispatch => {
    firebase
      .database()
      .ref(`${gameId}/player/${player}`)
      .once('value')
      .then(data => {
        dispatch(refreshPlayersFichas(gameId, player, data.val()));
      });
  };
};

export const makeMove = ficha => {
  console.log('makeMove [action]: ', ficha); //eslint-disable-line no-console
  const { fichaId, player, gameId } = ficha;

  return () => {
    firebase
      .database()
      .ref(`${gameId}/player/${player}/${fichaId}`)
      .remove();
  };
};
