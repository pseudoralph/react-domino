import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import c from '../constants';
import { v4 } from 'uuid';
import { matchLeft, matchRight } from '../helpers/matchers';
import { reconstructObject } from '../helpers/reconstructObject';
import { fichaRenderHelper } from '../helpers/fichaRenderHelper';

const { firebaseConf, types, gameStart } = c;

firebase.initializeApp(firebaseConf);

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
          startTime: new Date(),
          activePlayer: 'p1',
          firstMoveMade: false
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
  const playersFichas = pullAt(deckArray, [...Array(10).keys()]);

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
  const userAgent = navigator.userAgent ? navigator.userAgent : null;

  let playerGame = {};
  playerGame[player] = fichas;
  playerGame[`_userAgents/${player}`] = userAgent;

  return () => {
    firebase
      .database()
      .ref(`${gameId}/player`)
      .update(playerGame);
  };
};

export const refreshPlayersFichas = (gameId, player, fichas) => ({
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
      .ref(`${gameId}/gameStatus`)
      .on('child_changed', data => {
        dispatch(getUpdatedGameState(data.val(), gameId));
      });
  };
};

export const updateLocalTurn = (gameId, activePlayer) => ({
  type: types.TOGGLE_TURN,
  gameId,
  activePlayer
});

export const getUpdatedGameState = (data, gameId) => ({
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
      .push({ ...ficha, top: ficha.value[0], bottom: ficha.value[1] });
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

export const makeMove = (ficha, target) => {
  const { player, gameId } = ficha;

  const game = firebase.database().ref(gameId);

  const gameStatus = game.child('gameStatus');
  const board = game.child('board');

  return dispatch => {
    gameStatus.once('value').then(gameStatusData => {
      const { activePlayer } = gameStatusData.val();

      if (
        !gameStatusData.val().firstMoveMade &&
        player === activePlayer &&
        target
      ) {
        dispatch(removeFichaFromPlayer(ficha));
        dispatch(
          placeFichaOnBoard(
            {
              ...ficha,
              renderPos: +target,
              fichaStyling: fichaRenderHelper(+target)
            },
            gameId
          )
        );
        dispatch(togglePlayer(player, gameId));
        dispatch(closeBoard(gameStatus));
      }

      board.once('value').then(boardData => {
        // console.log(boardData.val());

        if (boardData.val() && player === activePlayer && target) {
          const leftMatch = matchLeft(boardData.val(), { ...ficha, target });
          const rightMatch = matchRight(boardData.val(), { ...ficha, target });

          if (leftMatch || rightMatch) {
            leftMatch == 'flip' && !rightMatch
              ? (ficha.value = [ficha.value[1], ficha.value[0]])
              : null;
            rightMatch == 'flip' && !leftMatch
              ? (ficha.value = [ficha.value[1], ficha.value[0]])
              : null;
            rightMatch == 'flip' && leftMatch == 'flip'
              ? (ficha.value = [ficha.value[1], ficha.value[0]])
              : null;

            dispatch(removeFichaFromPlayer(ficha));

            dispatch(
              placeFichaOnBoard(
                {
                  ...ficha,
                  renderPos: +target,
                  fichaStyling: fichaRenderHelper(+target)
                },
                gameId
              )
            );
            dispatch(togglePlayer(player, gameId));
          }
        }
      });
    });
  };
};

const closeBoard = gameStatus => {
  return () => gameStatus.set({ firstMoveMade: true });
};

export const togglePlayer = (player, gameId) => {
  return () => {
    firebase
      .database()
      .ref(`${gameId}/gameStatus/`)
      .update({ activePlayer: player == 'p2' ? 'p1' : 'p2' });
  };
};

export const removeFichaFromPlayer = ({ fichaId, player, gameId }) => {
  return () => {
    firebase
      .database()
      .ref(`${gameId}/player/${player}/${fichaId}`)
      .remove();
  };
};
