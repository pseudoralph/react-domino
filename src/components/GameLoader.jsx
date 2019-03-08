import React from 'react';
import PropTypes from 'prop-types';

import { startGame, setGameId } from './actions';
import { STYLES } from './assets/styling';

import PlayBoard from './PlayBoard';
import Hand from './Hand';

import { connect } from 'react-redux';

import randomWords from 'random-words';

class GameLoader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameId: null,
      player: null
    };

    this.handleHostGame = this.handleHostGame.bind(this);
    this.handleJoinGame = this.handleJoinGame.bind(this);

    this.dispatch = this.props.dispatch;
  }

  testCreateBoard(gameId) {
    console.log('test create board'); //eslint-disable-line no-console
    this.dispatch(startGame(gameId));
  }

  handleHostGame() {
    // const gameId = randomWords(3).join('-');
    const gameId = 'test-game';
    // this.dispatch(setGameId('test-game'));
    this.setState({ gameId, player: 'p1' });
    this.dispatch(startGame(gameId));
  }

  handleJoinGame(joinCode) {
    // const gameId = joinCode.current.value;
    const gameId = 'test-game';
    this.setState({ gameId, player: 'p2' });
  }

  handleToggleInputBox(hiddenInput) {
    hiddenInput.current.style.display === 'block'
      ? (hiddenInput.current.style.display = 'none')
      : (hiddenInput.current.style.display = 'block');
  }

  render() {
    const joinCode = React.createRef();
    const hiddenInput = React.createRef();

    // const { dispatch } = this.props;
    const { gameId, player } = this.state;

    if (gameId) {
      return (
        <div style={STYLES.game}>
          <PlayBoard gameId={gameId} />
          <Hand gameId={gameId} player={player} />
          <div style={{ position: 'fixed', right: '3px' }}>
            <button onClick={() => this.testCreateBoard(gameId)}>
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
