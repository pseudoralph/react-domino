import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { watchHand, watchGame } from '../../actions';
import Ficha from '../../components/Ficha';
// import Draggable from 'react-beautiful-dnd';

const MobileControl = props => {
  useEffect(() => {
    if (props.location.state) {
      const { gameId, player } = props.location.state;

      props.dispatch(watchHand(gameId, player));
      props.dispatch(watchGame(gameId));
    }
  }, []);

  if (props.location.state && props.fichas) {
    const { fichas, player, gameId } = props;
    return (
      <div>
        {Object.values(fichas).map(ficha => (
          <Ficha
            fichaStyling={'fichaInHand'}
            value={ficha.value}
            fichaId={ficha.fichaId}
            key={ficha.fichaId}
            player={player}
            gameId={gameId}
          />
        ))}
      </div>
    );
  } else {
    return <div>no.</div>;
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
      fichas: state.players[props.location.state.player],
      gameStatus: state.gameStatus,
      gameId: props.location.state.gameId,
      player: props.location.state.player
    };
  }
};

export default withRouter(connect(mapToStateProps)(MobileControl));
