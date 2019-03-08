import React from 'react';
import PropTypes from 'prop-types';
import Ficha from './Ficha';

import { watchHand } from './actions';

import { STYLES } from './assets/styling';
import { connect } from 'react-redux';

class Hand extends React.Component {
  constructor(props) {
    super(props);

    console.log('hand prosp: ', props);
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
  fichas: PropTypes.array,
  dispatch: PropTypes.func,
  gameId: PropTypes.string
};

const propsFromState = state => {
  return { fichas: state.players.p1, ...state };
};

export default connect(propsFromState)(Hand);
