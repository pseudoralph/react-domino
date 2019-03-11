import React from 'react';
import PropTypes from 'prop-types';
import Face from './Face';
import { STYLES } from './assets/styling';

function handleDrag(event, ficha) {
  event.dataTransfer.setData('ficha', JSON.stringify(ficha));
}

function Ficha(props) {
  const { value, fichaId, player, gameId, boardStyling } = props;

  return (
    <div
      draggable
      onDragStart={event =>
        handleDrag(event, { fichaId, player, value, gameId })
      }
      style={{
        ...STYLES.activePlayersHand.ficha,
        ...boardStyling
      }}
      className="ficha"
    >
      <Face value={props.value[0]} />
      <hr style={STYLES.activePlayersHand.line} />
      <Face value={props.value[1]} />
    </div>
  );
}

Ficha.propTypes = {
  value: PropTypes.array.isRequired,
  fichaId: PropTypes.string.isRequired,
  player: PropTypes.string,
  gameId: PropTypes.string,
  boardStyling: PropTypes.object,
  renderPos: PropTypes.number
};

export default Ficha;
