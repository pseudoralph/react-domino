import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { watchHand, watchGame } from '../../actions';
// import Draggable from 'react-beautiful-dnd';

const MobileControl = props => {
  useEffect(() => {
    if (props.location.state) {
      const { gameId, player } = props.location.state;

      props.dispatch(watchHand(gameId, player));
      props.dispatch(watchGame(gameId));
    }
  }, []);

  return (
    <div>
      {props.location.state
        ? `game id: ${props.location.state.gameId}`
        : 'you made it here alone'}
    </div>
  );
};

MobileControl.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func
};

const mapToStateProps = state => {
  return state;
};

export default withRouter(connect(mapToStateProps)(MobileControl));
