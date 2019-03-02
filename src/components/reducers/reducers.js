import initialState from './initialState';

const reducer = (state = initialState(), action) => {
  switch (action.type) {
  case 'MAKE_MOVE':
    return state;

  default:
    return state;
  }
};

export default reducer;
