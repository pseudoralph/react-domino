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
    this.props.dispatch(watchHand(this.props.gameId));
  }

  render() {
    const { fichas } = this.props;
    return (
      <div style={STYLES.activePlayersHand} className="activePlayersHand">
        <div style={STYLES.activePlayersHand.fichas}>
          {fichas.map(ficha => (
            <Ficha
              value={ficha.value}
              fichaId={ficha.fichaId}
              key={ficha.fichaId}
              player={'p1'}
            />
          ))}
        </div>
      </div>
    );
  }
}

Hand.propTypes = {
  fichas: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  gameId: PropTypes.string.isRequired
};

const propsFromState = state => {
  return { fichas: state.playersFichas.p1 };
};

export default connect(propsFromState)(Hand);
