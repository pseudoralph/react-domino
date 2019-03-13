import React from 'react';
import PropTypes from 'prop-types';
import Ficha from './Ficha';

import { watchHand, watchGame, togglePlayer } from './actions';

import { STYLES } from './assets/styling';
import { connect } from 'react-redux';

class Hand extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(watchHand(this.props.gameId, this.props.player));
    this.props.dispatch(watchGame(this.props.gameId));
  }

  render() {
    const { fichas, player, gameId, dispatch, gameStatus } = this.props;
    return (
      <div style={STYLES.activePlayersHand} className="activePlayersHand">
        <div style={STYLES.activePlayersHand.fichas}>
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
        <div style={{ right: '10px', position: 'fixed', bottom: '10px' }}>
          <button
            onClick={() => {
              gameStatus.activePlayer == player
                ? dispatch(togglePlayer(player, gameId))
                : null;
            }}
          >
            Skip turn
          </button>
        </div>
      </div>
    );
  }
}

Hand.propTypes = {
  dispatch: PropTypes.func,
  fichas: PropTypes.object,
  gameId: PropTypes.string,
  player: PropTypes.string,
  gameStatus: PropTypes.object
};

const propsFromState = (state, props) => {
  return { fichas: state.players[props.player], gameStatus: state.gameStatus };
};

export default connect(propsFromState)(Hand);
