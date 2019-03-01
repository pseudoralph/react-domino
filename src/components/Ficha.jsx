import React from 'react';
import PropTypes from 'prop-types';
import { STYLES } from './assets/styling';

function Ficha(props) {
  return (
    <div style={STYLES.ficha} className="ficha">
      Ficha works!{props.value}
    </div>
  );
}

Ficha.propTypes = {
  value: PropTypes.array.isRequired
};

export default Ficha;
