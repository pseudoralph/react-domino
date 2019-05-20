import React from 'react';
import PropTypes from 'prop-types';
import Face from './Face';
import { STYLES } from '../assets/styling';
import '../styles/ficha.css';

import { ItemTypes } from '../constants/itemTypes';
import { DragSource } from 'react-dnd';

const fichaSource = {
  beginDrag(props) {
    return props;
  },
  endDrag(props) {
    return props;
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

// function handleDrag(event, ficha) {
//   event.dataTransfer.setData('ficha', JSON.stringify(ficha));
// }

function Ficha(props) {
  const {
    value,
    // fichaId,
    // player,
    // gameId,
    fichaStyling,
    connectDragSource
    // isDragging
  } = props;
  return connectDragSource(
    <div
      style={{
        ...STYLES.activePlayersHand.ficha,
        ...STYLES.fichaStyling[fichaStyling],
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

Ficha.propTypes = {
  value: PropTypes.array.isRequired,
  fichaId: PropTypes.string.isRequired,
  player: PropTypes.string,
  gameId: PropTypes.string,
  renderPos: PropTypes.number,
  fichaStyling: PropTypes.string
};

export default DragSource(ItemTypes.FICHA, fichaSource, collect)(Ficha);
