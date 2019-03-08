import React from 'react';
import PropTypes from 'prop-types';
import { startGame } from './actions';
import { STYLES } from './assets/styling';

import PlayBoard from './PlayBoard';
import Hand from './Hand';

import { connect } from 'react-redux';

// import randomWords from 'random-words';

function testCreateBoard(dispatch, gameId) {
  console.log('test create board'); //eslint-disable-line no-console
  dispatch(startGame(gameId));
}

function handleHostGame() {
  console.log('hosting game...');
}

function handleJoinGame(joinCode) {
  console.log('joining grame...');
  console.log(joinCode.current.value);
}

function handleToggleInputBox(hiddenInput) {
  hiddenInput.current.style.display === 'block'
    ? (hiddenInput.current.style.display = 'none')
    : (hiddenInput.current.style.display = 'block');
}

function GameLoader(props) {
  const joinCode = React.createRef();
  const hiddenInput = React.createRef();

  const { dispatch, gameId } = props;

  if (false) {
    return (
      <div style={STYLES.game}>
        <PlayBoard gameId={'test-game'} /> <Hand gameId={'test-game'} />
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <button onClick={handleHostGame}>Host Game</button>
          <button onClick={() => handleToggleInputBox(hiddenInput)}>
            Join Game
          </button>
          <div ref={hiddenInput} style={{ display: 'none' }}>
            <input ref={joinCode} type="text" />
            <button onClick={() => handleJoinGame(joinCode)}>Join</button>
          </div>
        </div>

        <div style={{ position: 'fixed', right: '3px' }}>
          <button onClick={() => testCreateBoard(dispatch, gameId)}>
            test: create board
          </button>
        </div>
      </div>
    );
  }
}

GameLoader.propTypes = {
  dispatch: PropTypes.func,
  gameId: PropTypes.string.isRequired
};

export default connect()(GameLoader);
