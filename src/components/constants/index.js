import * as types from './actionTypes';
import firebaseConf from './firebaseConf';
import gameStart from './gameStart';

const constants = {
  types,
  firebaseConf,
  gameStart: gameStart()
};

export default constants;
