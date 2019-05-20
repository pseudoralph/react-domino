import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { watchHand, watchGame, watchBoard } from '../../actions';
import FichaTouch from './FichaTouch';
import '../../styles/mobileControl.css';

import TouchBackend from 'react-dnd-touch-backend'; //eslint-disable-line no-unused-vars
import HTML5Backend from 'react-dnd-html5-backend'; //eslint-disable-line no-unused-vars
import { DragDropContext } from 'react-dnd';

import DropZoneContainer from './dropZoneContainer';

const MobileControl = props => {
  useEffect(() => {
    if (props.location.state) {
      const { gameId, player } = props.location.state;

      props.dispatch(watchHand(gameId, player));
      props.dispatch(watchGame(gameId));
      props.dispatch(watchBoard(gameId));
    }
  }, []);

  if (props.location.state && props.fichas) {
    const { fichas, player, gameId, dispatch, fichasInPlay } = props;
    return (
      <div className="mobile-control-wrapper">
        <DropZoneContainer fichasInPlay={fichasInPlay} dispatch={dispatch} />

        <div>
          {Object.values(fichas).map(ficha => (
            <FichaTouch
              fichaStyling={'controllerView'}
              value={ficha.value}
              fichaId={ficha.fichaId}
              key={ficha.fichaId}
              player={player}
              gameId={gameId}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};

MobileControl.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func
};

const mapToStateProps = (state, props) => {
  if (!props.location.state) {
    return state;
  } else {
    return {
      fichasInPlay: state.fichasInPlay,
      fichas: state.players[props.location.state.player],
      gameStatus: state.gameStatus,
      gameId: props.location.state.gameId,
      player: props.location.state.player
    };
  }
};

export default withRouter(
  DragDropContext(HTML5Backend)(connect(mapToStateProps)(MobileControl))
);
