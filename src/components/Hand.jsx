import React from 'react';
import PropTypes from 'prop-types';
import Ficha from './Ficha';

import { watchHand } from './actions';

import { STYLES } from './assets/styling';
import { connect } from 'react-redux';

class Hand extends React.Component {
  constructor(props) {
    super(props);

    // console.log('hand props: ', props);
  }

  componentWillMount() {
    // this.props.dispatch(watchHand(this.props.gameId, this.props.player));
  }

  render() {
    const { fichas, player } = this.props;
    return (
      <div style={STYLES.activePlayersHand} className="activePlayersHand">
        <div style={STYLES.activePlayersHand.fichas}>
          {fichas.map(ficha => (
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
  fichas: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  gameId: PropTypes.string.isRequired,
  player: PropTypes.string.isRequired
};

const propsFromState = state => {
  return { fichas: state.players.p2, ...state };
};

export default connect(propsFromState)(Hand);
