import React, { useState } from 'react';
import PropTypes from 'prop-types';
import randomWords from 'random-words'; //eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import { startGame, grabFichas } from '../../actions';

import { Link, Redirect } from 'react-router-dom';
import info from '../../assets/icons/info.svg';
import '../../styles/selection.css';

const MultiMode = ({ handleInfoVis, dispatch }) => {
  const [gameState, setGameState] = useState({});

  const joinGameEntry = React.createRef();
  const gameCodeUserInput = React.createRef();

  const styling = {
    box: {
      position: 'relative',
      boxShadow: 'rgba(64, 78, 67, 0.55) 1px 1px 4px 0px',
      borderRadius: '0.5em',
      background: 'rgba(152, 179, 152, 0.9)',
      marginBottom: '1em',
      display: 'inline-block',
      width: '100%',
      padding: '2em',
      boxSizing: 'border-box',
      textAlign: 'center',
      maxWidth: '30em'
    },
    inlineButton: {
      display: 'inline',
      position: 'absolute',
      margin: '0',
      top: '.4em',
      right: '2em'
    }
  };

  const handleJoinGameEntryVisibility = () => {
    joinGameEntry.current.style.visibility =
      joinGameEntry.current.style.visibility === 'hidden'
        ? 'visible'
        : 'hidden';
  };

  const handleIsHosting = () => {
    const randomGameId = randomWords(2).join('-');
    const player = 'p1';

    setGameState({
      gameId: randomGameId,
      player
    });

    dispatch(startGame(randomGameId));
    dispatch(grabFichas(randomGameId, player));
  };

  const handleIsJoining = () => {
    //eslint-disable-next-line no-extra-boolean-cast
    if (!!gameCodeUserInput.current.value) {
      const joinCode = gameCodeUserInput.current.value;
      const player = 'p2';

      setGameState({ gameId: joinCode, player });
      dispatch(grabFichas(joinCode, player));
    }
  };

  if (gameState.gameId) {
    return (
      <Redirect
        to={{
          pathname: '/controller',
          state: gameState
        }}
      />
    );
  } else {
    return (
      <div className="selection-box">
        <div style={styling.box}>
          <h3>Controller</h3>
          <button
            style={{ display: 'inline-block', marginRight: '2em' }}
            className="selection-button"
            onClick={handleIsHosting}
          >
            Host Game
          </button>
          <button
            style={{ display: 'inline-block' }}
            className="selection-button"
            onClick={handleJoinGameEntryVisibility}
          >
            Join Game
          </button>
          <div
            ref={joinGameEntry}
            style={{ visibility: 'hidden', position: 'relative' }}
          >
            <input
              className="slection-input"
              type="text"
              ref={gameCodeUserInput}
            />
            <button
              className="selection-button"
              style={styling.inlineButton}
              onClick={handleIsJoining}
            >
              Join
            </button>
          </div>
        </div>
        <div style={styling.box}>
          <p>
            <Link to="/display">Display</Link>
          </p>
        </div>
      </div>
    );
  }
};

MultiMode.propTypes = {
  handleInfoVis: PropTypes.func
};

export default connect()(MultiMode);
