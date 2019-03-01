import React from 'react';
import PropTypes from 'prop-types';
import { STYLES } from './assets/styling';

function Player(props) {
  const { name, isComputer } = props;

  return (
    <div style={STYLES.player} className="player">
      Player works!<p>Name: {name}</p>
      <p>isComputer: {isComputer ? 'yes' : 'no'}</p>
    </div>
  );
}

Player.propTypes = {
  name: PropTypes.string.isRequired,
  isComputer: PropTypes.bool.isRequired
};

export default Player;
