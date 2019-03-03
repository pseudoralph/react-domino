import React from 'react';
import PropTypes from 'prop-types';
import Ficha from './Ficha';
import { STYLES } from './assets/styling';
import { connect } from 'react-redux';

function Hand(props) {
  const { fichas } = props;
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

Hand.propTypes = {
  fichas: PropTypes.array.isRequired
};

const propsFromState = state => {
  return { fichas: state.playersFichas.p1 };
};

export default connect(propsFromState)(Hand);
