import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Face from './Face';
import { STYLES } from '../assets/styling';
import Hammer from 'hammerjs';

function handleDrag(event, ficha) {
  event.dataTransfer.setData('ficha', JSON.stringify(ficha));
}

function Ficha(props) {
  useEffect(() => {
    console.log('hi!');
    const webkitDrag = new Hammer(webkitDraggableFicha.current);
    webkitDrag.on('pan', () => console.log('draggin!'));
    // console.log(webkitDrag);
  }, []);
  const webkitDraggableFicha = React.createRef();

  const { value, fichaId, player, gameId, fichaStyling } = props;
  return (
    <div
      ref={webkitDraggableFicha}
      draggable
      onDragStart={event =>
        handleDrag(event, { fichaId, player, value, gameId })
      }
      style={{
        ...STYLES.activePlayersHand.ficha,
        ...STYLES.fichaStyling[fichaStyling]
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

export default Ficha;
