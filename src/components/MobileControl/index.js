import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { watchHand, watchGame, watchBoard, skipPlayer } from '../../actions';
import { DragDropContext } from 'react-dnd';
import FichaTouch from './FichaTouch';
import FichaTouchDragLayer from './FichaTouchDragLayer';
import TouchBackend from 'react-dnd-touch-backend'; //eslint-disable-line no-unused-vars
// import HTML5Backend from 'react-dnd-html5-backend'; //eslint-disable-line no-unused-vars
import DropZoneContainer from './dropZoneContainer';
import '../../styles/mobileControl.css';
import skip from '../../assets/icons/skip.svg';

const FichaTouchBundler = ({ ficha, player, gameId }) => {
  return (
    <div style={{ display: 'inline' }}>
      <FichaTouch
        fichaStyling={'controllerView'}
        value={ficha.value}
        fichaId={ficha.fichaId}
        key={ficha.fichaId}
        player={player}
        gameId={gameId}
      />
      <FichaTouchDragLayer
        fichaStyling={'controllerView'}
        value={ficha.value}
        fichaId={`drag_${ficha.fichaId}`}
        key={`drag_${ficha.fichaId}`}
        player={player}
        gameId={gameId}
      />
    </div>
  );
};

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
    const {
      fichas,
      player,
      gameId,
      dispatch,
      fichasInPlay,
      gameStatus
    } = props;
    return (
      <div className="mobile-control-wrapper">
        <button
          onClick={() => {
            gameStatus.activePlayer === player
              ? dispatch(skipPlayer(player, gameId))
              : null;
          }}
          style={{
            position: 'fixed',
            backgroundColor: 'unset',
            border: '0',
            padding: '0',
            right: '1.3em'
          }}
        >
          <img src={skip} alt="skip" style={{ width: '3em' }} />
        </button>
        <DropZoneContainer
          fichasInPlay={fichasInPlay}
          dispatch={dispatch}
          isActivePlayer={gameStatus.activePlayer === player}
        />

        <div className="mobile-control-fichas-deck">
          {Object.values(fichas).map((ficha, i) => (
            <FichaTouchBundler
              ficha={ficha}
              gameId={gameId}
              player={player}
              key={i}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
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

FichaTouchBundler.propTypes = {
  ficha: PropTypes.object,
  player: PropTypes.string,
  gameId: PropTypes.string
};

MobileControl.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func
};

export default withRouter(
  DragDropContext(TouchBackend)(connect(mapToStateProps)(MobileControl))
);
