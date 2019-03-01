import React from 'react';
import PropTypes from 'prop-types';
import { STYLES } from './assets/styling';

function Player(props) {
  const { name, isComputer } = props;
  const icon = isComputer ? '🤖' : '🧔🏻';

  return (
    <div style={STYLES.player} className="player">
      <p style={STYLES.player.icon}>{icon}</p>
      <p>Name: {name}</p>
    </div>
  );
}

Player.propTypes = {
  name: PropTypes.string.isRequired,
  isComputer: PropTypes.bool.isRequired
};

export default Player;
