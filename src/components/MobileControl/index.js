import React from 'react';
import PropTypes from 'prop-types';
// import Draggable from 'react-beautiful-dnd';

const MobileControl = props => {
  return (
    <div>
      {props.location.state
        ? `game id: ${props.location.state.gameId}`
        : 'you made it here alone'}
    </div>
  );
};

MobileControl.propTypes = {
  location: PropTypes.object
};

export default MobileControl;
