// // import { combineReducers } from 'redux';

// import clonedeep from 'lodash.clonedeep';
// import initialState from './initialState';
// import constants from '../constants';

// const { types } = constants;

// // const rootReducer = combineReducers({
// //   fichasInPlay: startReducer
// // });

// const rootReducer = (state = initialState(), action) => {
//   const { fichaToMove, player } = action;
//   let newState = clonedeep(state);

//   switch (action.type) {
//     case types.MAKE_MOVE:
//       console.log('dragged');
//       Object.values(newState.playersFichas[player]).map((val, i) => {
//         if (val.fichaId === fichaToMove) {
//           newState.fichasInPlay.concat(val);

//           newState.playersFichas[player].splice(i, 1);
//         }
//       });

//       return newState;

//     case types.UPDATE_HAND:
//       console.log(action); //eslint-disable-line no-console

//       return state;

//     case types.SEND_NEW_FICHAS:
//       console.log(action); //eslint-disable-line no-console
//       return state;

//     default:
//       return state;
//   }
// };

// export default rootReducer;
