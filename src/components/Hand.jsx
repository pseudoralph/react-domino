import React from 'react';
import PropTypes from 'prop-types';
import Ficha from './Ficha';
import { STYLES } from './assets/styling';

function Hand(props) {
  const { fichas } = props;
  return (
    <div style={STYLES.activePlayersHand} className="activePlayersHand">
      <div style={STYLES.activePlayersHand.fichas}>
        {fichas.map((ficha, i) => (
          <Ficha value={ficha} key={i} />
        ))}
      </div>
    </div>
  );
}

Hand.propTypes = {
  fichas: PropTypes.array.isRequired
};

export default Hand;
