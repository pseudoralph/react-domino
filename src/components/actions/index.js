import firebase from 'firebase';
import c from '../constants';
import { sortedFichas } from '../constants/gameStart';

const { firebaseConf, types, gameStart } = c;

firebase.initializeApp(firebaseConf);

export const moveFichasToSlice = (gameId, player, randomizedFichas) => {
  Object.values(randomizedFichas).map(fichas => {
    const fichasId = [];

    Object.keys(fichas).map(id => fichasId.push(id));

    console.log(fichasId.length);
    // delete fichas[fichasId[0]];
  });

  // console.log(fichasId);
  // const playerFichas = Object.values.map()

  // let fichaKeys = Object.keys(randomizedFichas);
  // console.log(fichaKeys);

  //   var randomProperty = function (obj) {
  //     var keys = Object.keys(obj)
  //     return obj[keys[ keys.length * Math.random() << 0]];
  // };

  return () => true;
};

export const grabFichas = (gameId, player) => {
  return dispatch => {
    firebase
      .database()
      .ref(gameId)
      .once('value')
      .then(data => {
        dispatch(moveFichasToSlice(gameId, player, data.val()));
      });
  };
};

export const startGame = gameId => {
  let firebaseableFichas = {};

  sortedFichas().map(value => {
    let dbKey = firebase
      .database()
      .ref(gameId)
      .child(`randomizedFichas`)
      .push().key;

    firebaseableFichas[dbKey] = { value, fichaId: dbKey };
  });

  firebase
    .database()
    .ref(`${gameId}/randomizedFichas`)
    .update(firebaseableFichas);

  return () => true;
};

// export const startGame = gameId => {
//   const p1 = gameStart.players.p1; //.map(ficha => ficha.value);
//   const p2 = gameStart.players.p2; //.map(ficha => ficha.value);
//   const unplayed = [
//     ...gameStart.players.p3,
//     ...gameStart.players.p4,
//     ...gameStart.unplayedFichas
//   ];
//   let updateP1 = {};
//   let updateP2 = {};

//   p1.map(item => {
//     let dbKey = firebase
//       .database()
//       .ref(`${gameId}/players`)
//       .child('p1')
//       .push().key;

//     updateP1[dbKey] = { ...item, fichaId: dbKey };
//   });

//   p2.map(item => {
//     let dbKey = firebase
//       .database()
//       .ref(`${gameId}/players`)
//       .child('p2')
//       .push().key;

//     updateP2[dbKey] = { ...item, fichaId: dbKey };
//   });

//   firebase
//     .database()
//     .ref(`${gameId}/players/p1`)
//     .update(updateP1);

//   firebase
//     .database()
//     .ref(`${gameId}/players/p2`)
//     .update(updateP2);

//   // return () => true;

//   return dispatch => {
//     dispatch(loadAllPlayer({ p1: updateP1 }, gameId));
//     // dispatch(loadAllPlayer({ p2: updateP2 }, gameId));
//   };
// };

export const loadAllPlayer = (players, gameId) => ({
  type: types.LOAD_ALL_PLAYERS,
  players,
  gameId
});

export const makeMove = () => {
  console.log('ok');

  firebase
    .database()
    .ref('test-game/players/p1')
    .update('hji');

  return dispatch => ({
    type: types.MAKE_MOVE
  });
};

export const watchHand = (gameId, player) => {
  console.log(player);
  return dispatch => {
    firebase
      .database()
      .ref(`${gameId}/players/${player}`)
      .on('child_changed', data => {
        dispatch(refreshHand(data.val(), player));
      });
  };
};

export const refreshHand = (ficha, player) => ({
  type: types.REFRESH_HAND,
  ficha,
  player
});
