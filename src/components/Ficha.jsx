import React from 'react';
import PropTypes from 'prop-types';
import { STYLES } from './assets/styling';

function handleDrag(event, ficha) {
  event.dataTransfer.setData('ficha', JSON.stringify(ficha));
}

function Ficha(props) {
  const { value, fichaId, player } = props;
  return (
    <div
      draggable
      onDragStart={event => handleDrag(event, { fichaId, player, value })}
      style={{ ...STYLES.activePlayersHand.ficha, cursor: 'pointer' }}
      className="ficha"
    >
      <p style={{ margin: 0 }}>{value[0]}</p>
      <hr />
      <p style={{ margin: 0 }}>{value[1]}</p>
    </div>
  );
}

Ficha.propTypes = {
  value: PropTypes.array.isRequired,
  fichaId: PropTypes.string.isRequired,
  player: PropTypes.string.isRequired
};

export default Ficha;
