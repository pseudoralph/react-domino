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
    this.props.dispatch(watchHand(this.props.gameId, this.props.player));
  }

  render() {
    const { fichas, player } = this.props;

    console.log(fichas);
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
  dispatch: PropTypes.func,
  fichas: PropTypes.array,
  gameId: PropTypes.string,
  player: PropTypes.string
};

const propsFromState = (state, props) => {
  return { fichas: state.players[props.player] };
};

export default connect(propsFromState)(Hand);
