import types from '../constants';

const fichasInPlay = (state = {}, action) => {
  switch (action.type) {
    case types.MAKE_MOVE:
      console.log('did you make it?'); // eslint-disable-line no-console
      return state;
    default:
      return state;
  }
};

export default fichasInPlay;
