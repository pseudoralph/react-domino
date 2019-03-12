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
      .ref(gameId)
      .set({
        uplayedFichas: readySet,
        gameStatus: {
          [gameId]: { activePlayer: 'p1', unplayedBoard: true, openPos: 0 }
        }
      });
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
  // state
  type: types.REFRESH_FICHAS,
  gameId,
  player,
  fichas
});

/// PLAYER INIT STOPS HERE ///

/// WATCHERS START HERE ///

export const watchHand = (gameId, player) => {
  return dispatch => {
    firebase
      .database()
      .ref(`${gameId}/player/${player}`)
      .on('child_removed', () => {
        // console.log('ficha removed', data.val());
        dispatch(getPlayersFichasFromDb(player, gameId));
      });
  };
};

export const watchBoard = gameId => {
  return dispatch => {
    firebase
      .database()
      .ref(`${gameId}/board`)
      .on('child_added', () => {
        dispatch(getFichasInPlayFromDb(gameId));
      });
  };
};

export const watchGame = gameId => {
  return dispatch => {
    firebase
      .database()
      .ref(`${gameId}`)
      .child('gameStatus')
      .on('child_changed', data => {
        // console.log('[watchGame] observed change event');
        dispatch(getUpdatedGameState(gameId, data.val()));
      });
  };
};

export const toggleTurn = (gameId, player) => {
  return () => {
    firebase
      .database()
      .ref(`${gameId}/gameStatus/${gameId}`)
      .update({ activePlayer: player });
  };
};

export const updateLocalTurn = (gameId, activePlayer) => ({
  type: types.TOGGLE_TURN,
  gameId,
  activePlayer
});

export const getUpdatedGameState = (gameId, data) => ({
  type: types.UPDATE_GAME_STATUS,
  gameId,
  data
});

/// WATCHERS END HERE ///

export const placeFichaOnBoard = (ficha, gameId) => {
  return () => {
    firebase
      .database()
      .ref(`${gameId}/board`)
      .push(ficha);
  };
};

export const getFichasInPlayFromDb = gameId => {
  return dispatch => {
    firebase
      .database()
      .ref(`${gameId}/board`)
      .once('value')
      .then(data => {
        dispatch(refreshBoardFichas(gameId, data.val()));
      });
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

export const refreshBoardFichas = (gameId, fichas) => ({
  type: types.REFRESH_BOARD,
  gameId,
  fichas
});

export const makeMove = ficha => {
  const { player, gameId } = ficha;

  console.log('requested ficha to remove =', ficha); //eslint-disable-line no-console

  return dispatch => {
    firebase
      .database()
      .ref(`${gameId}/gameStatus/${gameId}`)
      .once('value')
      .then(data => {
        let { activePlayer, openPos, unplayedBoard } = data.val();

        console.log('game status =', data.val()); //eslint-disable-line no-console

        if (player === activePlayer) {
          if (unplayedBoard) {
            console.log('PLAY OK'); //eslint-disable-line no-console

            dispatch(removeFichaFromPlayer(ficha));

            dispatch(
              placeFichaOnBoard({ ...ficha, renderPos: openPos }, gameId)
            );

            dispatch(
              updateStatus({
                playSuccess: true,
                playerMoved: player,
                fichaOccupied: openPos,
                gameId
              })
            );
          } else {
            console.log('board already busy!'); //eslint-disable-line no-console
          }
        } else {
          return false;
        }

        // dispatch(removeFichaFromPlayer(ficha));
      });
    // queue up the game status
    // 1 is the piece being sent from the active player?
    // 2 is the board empty OR do the end pieces match
    // 3 give the ficha its position number and continue
    // return a false

    // delete ficha from player's hand
  };
};

export const updateStatus = ({
  playSuccess,
  playerMoved,
  fichaOccupied,
  gameId
}) => {
  console.log('got it!');
  if (playSuccess) {
    return () => {
      firebase
        .database()
        .ref(`${gameId}/gameStatus/${gameId}`)
        .update({ openPos: ++fichaOccupied });
    };
  }
};

export const removeFichaFromPlayer = ({ fichaId, player, gameId }) => {
  console.log('ficha successfully removed from ', player); //eslint-disable-line no-console
  return () => {
    firebase
      .database()
      .ref(`${gameId}/player/${player}/${fichaId}`)
      .remove();
  };
};
