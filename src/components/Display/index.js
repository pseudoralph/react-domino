import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { watchGame, watchBoard } from '../../actions';

const Display = props => {
  useEffect(() => {
    if (props.location.state) {
      const { gameId } = props.location.state;

      props.dispatch(watchGame(gameId));
      props.dispatch(watchBoard(gameId));
    }
  }, []);

  if (props.location.state) {
    return <div>display module</div>;
  } else {
    return <Redirect to="/" />;
  }
};

Display.propTypes = {};

// const mapToStateProps = (state, props) => {
//   if (!props.location.state) {
//     return state;
//   } else {
//     return {
//       fichasInPlay: state.fichasInPlay,
//       fichas: state.players[props.location.state.player],
//       gameStatus: state.gameStatus,
//       gameId: props.location.state.gameId,
//       player: props.location.state.player
//     };
//   }
// };

export default connect()(Display);
