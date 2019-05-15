import React, { useState } from 'react';
import PropTypes from 'prop-types';
import randomWords from 'random-words'; //eslint-disable-line no-unused-vars

import { Link } from 'react-router-dom';
import info from '../../assets/icons/info.svg';
import '../../styles/selection.css';

const MultiMode = props => {
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

  const [hostedGame, setHostedGame] = useState({
    gameId: null,
    player: null
  });

  const handleHostedGame = () => {
    setHostedGame({
      gameId: randomWords(2).join('-'),
      player: 'p1'
    });

    props.handleRedir();

    // this.dispatch(startGame(gameId));
    // this.dispatch(grabFichas(gameId, 'p1'));
  };

  return (
    <div className="selection-box">
      <div style={styling.box}>
        <button onClick={handleHostedGame}>Host</button>
        <p>
          <Link
            to={{
              pathname: '/controller',
              state: { hosted: true }
            }}
          >
            HOST
          </Link>
        </p>
      </div>
      <div style={styling.box}>
        <p>
          <Link to="/display">Display</Link>
        </p>
      </div>
    </div>
  );
};

MultiMode.propTypes = {
  handleInfoVis: PropTypes.func
};

export default MultiMode;
