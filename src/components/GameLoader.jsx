import React from 'react';
import PropTypes from 'prop-types';
import { startGame } from './actions';

import { connect } from 'react-redux';

function testCreateBoard(dispatch, gameId) {
  console.log('test create board'); //eslint-disable-line no-console
  dispatch(startGame(gameId));
}

function GameLoader(props) {
  const { dispatch, gameId } = props;

  return (
    <div style={{ position: 'fixed', right: '3px' }}>
      <button onClick={() => testCreateBoard(dispatch, gameId)}>
        test: create board
      </button>
    </div>
  );
}

GameLoader.propTypes = {
  dispatch: PropTypes.func,
  gameId: PropTypes.string.isRequired
};

export default connect()(GameLoader);
