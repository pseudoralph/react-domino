import React from 'react';
import PropTypes from 'prop-types';

function Player(props) {
  const { name, isComputer } = props;

  return (
    <div>
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
