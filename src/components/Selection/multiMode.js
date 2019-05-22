import React, { useState } from 'react';
import randomWords from 'random-words';
import { connect } from 'react-redux';
import { startGame, grabFichas } from '../../actions';

import { Redirect } from 'react-router-dom';
import { styling } from './styling';
import ConnectToDisplay from './connectDisplay';

const MultiMode = ({ dispatch }) => {
  const [gameState, setGameState] = useState({});

  const gameCodeUserInput = React.createRef();

  const handleIsHosting = () => {
    const randomGameId = randomWords(2).join('-');
    const player = 'p1';

    setGameState({
      gameId: randomGameId,
      player,
      mode: 'controller'
    });

    dispatch(startGame(randomGameId, 'controller'));
    dispatch(grabFichas(randomGameId, player));
  };

  const handleIsJoining = () => {
    //eslint-disable-next-line no-extra-boolean-cast
    if (!!gameCodeUserInput.current.value) {
      const joinCode = gameCodeUserInput.current.value.toLowerCase();
      const player = 'p2';

      setGameState({ gameId: joinCode, player, mode: 'controller' });
      dispatch(grabFichas(joinCode, player));
    }
  };

  const handleDisplayConnect = gameCode => {
    //eslint-disable-next-line no-extra-boolean-cast
    if (!!gameCode.current.value) {
      const joinCode = gameCode.current.value.toLowerCase();
      setGameState({ gameId: joinCode, mode: 'display' });
    }
  };

  if (gameState.gameId && gameState.mode === 'controller') {
    return (
      <Redirect
        to={{
          pathname: '/controller',
          state: gameState
        }}
      />
    );
  } else if (gameState.gameId && gameState.mode === 'display') {
    return (
      <Redirect
        to={{
          pathname: '/display',
          state: gameState
        }}
      />
    );
  } else {
    return (
      <div className="selection-box">
        <div style={styling.box}>
          <h3>Controller</h3>
          <button className="selection-button" onClick={handleIsHosting}>
            Host
          </button>

          <hr />

          <div style={{ position: 'relative' }}>
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
        <ConnectToDisplay handleDisplayConnect={handleDisplayConnect} />
      </div>
    );
  }
};

export default connect()(MultiMode);
