import React from 'react';
import PropTypes from 'prop-types';

import domino from './assets/img/domino-lean.png';

import { startGame, grabFichas } from './actions';
import { STYLES } from './assets/styling';

import PlayBoard from './PlayBoard';
import Hand from './Hand';

import { connect } from 'react-redux';

import randomWords from 'random-words'; //eslint-disable-line no-unused-vars

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

  handleHostGame() {
    // const gameId = randomWords(3).join('-');
    const gameId = 'test-game';
    this.setState({ gameId, player: 'p1' });
    this.dispatch(startGame(gameId));
    this.dispatch(grabFichas(gameId, 'p1'));
  }

  handleJoinGame(joinCode) {
    const gameId = joinCode.current.value
      ? joinCode.current.value
      : 'test-game';

    this.setState({ gameId, player: 'p2' });
    this.dispatch(grabFichas(gameId, 'p2'));
  }

  handleToggleInputBox(hiddenInput) {
    hiddenInput.current.style.display === 'block'
      ? (hiddenInput.current.style.display = 'none')
      : (hiddenInput.current.style.display = 'block');
  }

  render() {
    const joinCode = React.createRef();
    const hiddenInput = React.createRef();

    const { gameId, player } = this.state;

    if (gameId) {
      return (
        <div style={STYLES.game}>
          <PlayBoard gameId={gameId} />
          <Hand gameId={gameId} player={player} />
        </div>
      );
    } else {
      return (
        <div style={STYLES.game}>
          <div style={STYLES.gameSelect}>
            <img src={domino} style={STYLES.gameSelect.image} />
            <button
              onClick={this.handleHostGame}
              style={STYLES.gameSelect.button}
            >
              Host Game
            </button>
            <button
              style={STYLES.gameSelect.button}
              onClick={() => this.handleToggleInputBox(hiddenInput)}
            >
              Join Game
            </button>
            <div ref={hiddenInput} style={{ display: 'none' }}>
              <input
                ref={joinCode}
                type="text"
                style={STYLES.gameSelect.input}
              />
              <button
                style={STYLES.gameSelect.button.join}
                onClick={() => this.handleJoinGame(joinCode)}
              >
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
