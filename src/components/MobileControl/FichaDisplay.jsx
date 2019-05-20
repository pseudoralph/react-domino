import React from 'react';
import PropTypes from 'prop-types';
import Face from '../Face';
import { STYLES } from '../../assets/styling';

import '../../styles/ficha.css';

function FichaDisplay({ value, fichaStyling, transform }) {
  return (
    <div
      style={{
        ...STYLES.activePlayersHand.ficha,
        ...STYLES.fichaStyling[fichaStyling],
        ...transform,
        bottom: 0
      }}
      className="ficha"
    >
      <Face value={value[0]} />
      <hr style={STYLES.activePlayersHand.line} />
      <Face value={value[1]} />
    </div>
  );
}

FichaDisplay.propTypes = {
  value: PropTypes.array.isRequired,
  fichaStyling: PropTypes.string
};

export default FichaDisplay;
