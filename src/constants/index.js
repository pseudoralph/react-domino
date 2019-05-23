import * as types from './actionTypes';
import firebaseConf from '../../.env';
import gameStart from './gameStart';
import { fichasGrid, fichasGridDisplay } from './fichasGrid';

const constants = {
  types,
  firebaseConf,
  gameStart,
  fichasGrid,
  fichasGridDisplay
};

export default constants;
