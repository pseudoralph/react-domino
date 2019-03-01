import React from 'react';
import PropTypes from 'prop-types';
import { STYLES } from './assets/styling';

// function buildFace(dots) {
//   return (dots.map((dot)=>(<p>•</p>)))
// }

function Ficha(props) {
  const { value } = props;
  console.log(value);

  return (
    <div style={STYLES.activePlayersHand.ficha} className="ficha">
      <p style={{ margin: 0 }}>{value[0]}</p>
      <hr />
      <p style={{ margin: 0 }}>{value[1]}</p>
    </div>
  );
}

Ficha.propTypes = {
  value: PropTypes.array.isRequired
};

export default Ficha;
