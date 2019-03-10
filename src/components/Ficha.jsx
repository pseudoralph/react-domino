import React from 'react';
import PropTypes from 'prop-types';
import Face from './Face';
import { STYLES } from './assets/styling';

function handleDrag(event, ficha) {
  event.dataTransfer.setData('ficha', JSON.stringify(ficha));
}

function Ficha(props) {
  const { value, fichaId, player, gameId } = props;
  return (
    <div
      draggable
      onDragStart={event =>
        handleDrag(event, { fichaId, player, value, gameId })
      }
      style={STYLES.activePlayersHand.ficha}
      className="ficha"
    >
      <Face value={props.value} />
      <hr style={STYLES.activePlayersHand.line} />

      <Face value={props.value} />
    </div>
  );
}

Ficha.propTypes = {
  value: PropTypes.array.isRequired,
  fichaId: PropTypes.string.isRequired,
  player: PropTypes.string.isRequired,
  gameId: PropTypes.string.isRequired
};

export default Ficha;
