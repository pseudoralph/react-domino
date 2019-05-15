import React, { useState } from 'react';
import PropTypes from 'prop-types';
import randomWords from 'random-words'; //eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import { startGame, grabFichas } from '../../actions';

import { Link, Redirect } from 'react-router-dom';
import info from '../../assets/icons/info.svg';
import '../../styles/selection.css';

const MultiMode = props => {
  const [gameState, setGameState] = useState({});

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
    }
  };

  const handleIsHosting = () => {
    const randomGameId = randomWords(2).join('-');
    const player = 'p1';

    setGameState({
      gameId: randomGameId,
      player
    });

    props.dispatch(startGame(randomGameId));
    props.dispatch(grabFichas(randomGameId, player));
  };

  const handleIsJoining = () => {
    const joinCode = gameState.gameId;
    const player = 'p2';

    setGameState({ gameId: joinCode, player });

    props.dispatch(grabFichas(joinCode, player));
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
          <button onClick={handleIsHosting}>Host</button>
          <button onClick={handleIsJoining}>Join</button>
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
