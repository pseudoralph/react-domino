import * as types from './actionTypes';
import firebaseConf from './firebaseConf';
import randomizedFichas from './randomizedFichas';

const CONSTANTS = {
  types,
  firebaseConf,
  ranomSet: randomizedFichas()
};

export default CONSTANTS;
