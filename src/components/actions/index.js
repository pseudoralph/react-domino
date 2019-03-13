import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import c from '../constants';
import { v4 } from 'uuid';

const { firebaseConf, types, gameStart } = c;

firebase.initializeApp(firebaseConf);

/// HELPERS ///

const matchLeft = (presentBoard, ficha) => {
  console.log('left', presentBoard, ficha);
  const sortedFichas = Object.values(presentBoard).sort(function(a, b) {
    return a.renderPos - b.renderPos;
  });
  const back = sortedFichas[0];

  // Object.values(presentBoard).sort((a,b)=>{a.renderPos - b.renderPos})

  console.log('top part matched:', ficha.value.includes(back.top));

  if (ficha.value.indexOf(back.top) === 0) {
    console.log(`new ficha ${ficha.fichaId} must be rotated`);
  }

  return ficha.value.includes(back.top) && back.renderPos - 1 == ficha.target;
};

const matchRight = (presentBoard, ficha) => {
  const sortedFichas = Object.values(presentBoard).sort(function(a, b) {
    return a.renderPos - b.renderPos;
  });

  const front = sortedFichas[sortedFichas.length - 1];

  // const rightTop = Object.values(presentBoard).sort(x => x.renderPos)[Object.values(presentBoard).sort(x => x.renderPos).length-1].top

  console.log('bottom part matched:', ficha.value.includes(front.bottom));

  // console.log(ficha.value.indexOf(front.bottom)); //1 == a rotate is needed

  if (ficha.value.indexOf(front.bottom) === 1) {
    console.log(`new ficha ${ficha.fichaId} must be rotated`);
  }

  return (
    ficha.value.includes(front.bottom) && front.renderPos + 1 == ficha.target
  );
};

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
          [gameId]: { activePlayer: 'p1', unplayedBoard: true }
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
  const gameStatus = game.child(`/gameStatus/${gameId}`);
  const board = game.child('board');

  return dispatch => {
    gameStatus.once('value').then(gameStatusData => {
      board.once('value').then(boardData => {
        const { activePlayer } = gameStatusData.val();

        if (boardData.val() && player === activePlayer && target) {
          // condition for played board
          if (
            matchLeft(boardData.val(), { ...ficha, target }) ||
            matchRight(boardData.val(), { ...ficha, target })
          ) {
            dispatch(removeFichaFromPlayer(ficha));

            dispatch(
              placeFichaOnBoard({ ...ficha, renderPos: +target }, gameId)
            );
          }
        } else {
          // condition for new board
          if (player === activePlayer && target) {
            dispatch(removeFichaFromPlayer(ficha));

            dispatch(
              placeFichaOnBoard({ ...ficha, renderPos: +target }, gameId)
            );
          }
        }
      });
    });
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
      true;
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
