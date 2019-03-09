import React from 'react';
import PropTypes from 'prop-types';
import Ficha from './Ficha';

import { watchHand } from './actions';

import { STYLES } from './assets/styling';
import { connect } from 'react-redux';

class Hand extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('hi there now');
    this.props.dispatch(watchHand(this.props.gameId, this.props.player));
  }

  render() {
    const { fichas, player } = this.props;

    console.log(this.props);
    return (
      <div style={STYLES.activePlayersHand} className="activePlayersHand">
        <div style={STYLES.activePlayersHand.fichas}>
          {Object.values(fichas).map(ficha => (
            <Ficha
              value={ficha.value}
              fichaId={ficha.fichaId}
              key={ficha.fichaId}
              player={player}
            />
          ))}
        </div>
      </div>
    );
  }
}

Hand.propTypes = {
  dispatch: PropTypes.func,
  fichas: PropTypes.object,
  gameId: PropTypes.string,
  player: PropTypes.string
};

const propsFromState = (state, props) => {
  return { fichas: state.players[props.player], ...state };
};

export default connect(propsFromState)(Hand);
