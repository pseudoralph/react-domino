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

export const placeFichaOnBoard = (ficha, board) => {
  return () => {
    board.push({ ...ficha, top: ficha.value[0], bottom: ficha.value[1] });

    // firebase
    //   .database()
    //   .ref(`${gameId}/board`)
    //   .push({ ...ficha, top: ficha.value[0], bottom: ficha.value[1] });
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

const moveInsights = (fichasInPlay, target) => {
  const layout = Object.values(fichasInPlay)
    .map(ficha => ficha.renderPos)
    .sort((a, b) => a - b);

  if (target < layout[0] && target < layout[layout.length - 1]) {
    return { side: 'left', position: layout[0] - 1 };
  } else if (target > layout[0] && target > layout[layout.length - 1]) {
    return { side: 'right', position: layout[layout.length - 1] + 1 };
  } else if (!layout.includes(target)) {
    return false;
  }
};

const commitMove = (ficha, toPosition, board, gameStatus, player) => {
  return (dispatch, state) => {
    debugger;
    dispatch(removeFichaFromPlayer(ficha));
    dispatch(
      placeFichaOnBoard(
        {
          ...ficha,
          renderPos: toPosition,
          fichaStyling: fichaRenderHelper(toPosition)
        },
        board
      )
    );
    dispatch(togglePlayer(gameStatus, player));
  };
};

export const makeMove = (ficha, target) => {
  const { player, gameId } = ficha;

  const game = firebase.database().ref(gameId);

  const gameStatus = game.child('gameStatus');
  const board = game.child('board');
  // const currentPlayer = game.child(`player/${player}`);

  return (dispatch, state) => {
    const { fichasInPlay } = state();

    gameStatus.once('value').then(gameStatusData => {
      const { activePlayer, firstMoveMade } = gameStatusData.val();

      if (!firstMoveMade && player === activePlayer) {
        dispatch(removeFichaFromPlayer(ficha));
        dispatch(
          placeFichaOnBoard(
            {
              ...ficha,
              renderPos: +target,
              fichaStyling: fichaRenderHelper(+target)
            },
            board
          )
        );
        dispatch(togglePlayer(gameStatus, player));

        // return true;
      } else if (fichasInPlay && player === activePlayer) {
        const canMove = moveInsights(fichasInPlay, target);
        let rightMatch, leftMatch;

        if (canMove) {
          const { side, position } = canMove;
          switch (side) {
            case 'right':
              rightMatch = matchRight(fichasInPlay, { ...ficha, position });
              rightMatch === 'flip'
                ? (ficha.value = [ficha.value[1], ficha.value[0]])
                : null;
              rightMatch &&
                dispatch(
                  commitMove(ficha, position, board, gameStatus, player)
                );

              break;
            case 'left':
              leftMatch = matchLeft(fichasInPlay, { ...ficha, position });
              leftMatch === 'flip'
                ? (ficha.value = [ficha.value[1], ficha.value[0]])
                : null;
              leftMatch &&
                dispatch(
                  commitMove(ficha, position, board, gameStatus, player)
                );
              break;
          }
        }
      }
    });
  };
};

export const togglePlayer = (gameStatus, player) => {
  return () => {
    gameStatus.update({
      activePlayer: player == 'p2' ? 'p1' : 'p2',
      firstMoveMade: true
    });

    // firebase
    //   .database()
    //   .ref(`${gameId}/gameStatus/`)
    //   .update({ activePlayer: player == 'p2' ? 'p1' : 'p2' });
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
