import React from 'react';
import PropTypes from 'prop-types';
import { startGame } from './actions';

import { connect } from 'react-redux';

function handleTestClick(dispatch, gameId) {
  console.log('game loader button');
  dispatch(startGame(gameId));
}

function GameLoader(props) {
  const { dispatch, gameId } = props;

  return (
    <div style={{ position: 'fixed', right: '3px' }}>
      <button onClick={() => handleTestClick(dispatch, gameId)}>test</button>
    </div>
  );
}

GameLoader.propTypes = {
  dispatch: PropTypes.func,
  gameId: PropTypes.string.isRequired
};

export default connect()(GameLoader);
