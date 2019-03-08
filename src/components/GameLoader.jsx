import React from 'react';
import PropTypes from 'prop-types';
import { startGame } from './actions';
import { STYLES } from './assets/styling';

import PlayBoard from './PlayBoard';
import Hand from './Hand';

import { connect } from 'react-redux';

import randomWords from 'random-words';

class GameLoader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameId: null
    };

    this.handleHostGame = this.handleHostGame.bind(this);
  }

  testCreateBoard(dispatch, gameId) {
    console.log('test create board'); //eslint-disable-line no-console
    dispatch(startGame(gameId));
  }

  handleHostGame() {
    const gameCode = randomWords(3).join('-');
    console.log(gameCode);
    this.setState({ gameId: 'test-game' });
  }

  handleJoinGame(joinCode) {
    console.log('joining grame...'); //eslint-disable-line no-console
    console.log(joinCode.current.value); //eslint-disable-line no-console
  }

  handleToggleInputBox(hiddenInput) {
    hiddenInput.current.style.display === 'block'
      ? (hiddenInput.current.style.display = 'none')
      : (hiddenInput.current.style.display = 'block');
  }

  render() {
    const joinCode = React.createRef();
    const hiddenInput = React.createRef();

    const { dispatch } = this.props;
    const { gameId } = this.state;

    if (gameId) {
      return (
        <div style={STYLES.game}>
          <PlayBoard gameId={gameId} />
          <Hand gameId={gameId} />
          <div style={{ position: 'fixed', right: '3px' }}>
            <button onClick={() => this.testCreateBoard(dispatch, gameId)}>
              test: create board
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div style={STYLES.game}>
          <div>
            <button onClick={this.handleHostGame}>Host Game</button>
            <button onClick={() => this.handleToggleInputBox(hiddenInput)}>
              Join Game
            </button>
            <div ref={hiddenInput} style={{ display: 'none' }}>
              <input ref={joinCode} type="text" />
              <button onClick={() => this.handleJoinGame(joinCode)}>
                Join
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
}

GameLoader.propTypes = {
  dispatch: PropTypes.func
};

export default connect()(GameLoader);
