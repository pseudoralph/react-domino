import React from 'react';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../../constants/itemTypes';

const boardTarget = {
  drop(props, monitor, component) {
    console.log(monitor.getItem());
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    drop: monitor.getItem()
  };
}

const Board = ({ connectDropTarget }) => {
  return connectDropTarget(
    <div
      style={{
        width: '100%',
        border: '5px dashed black',
        padding: '1em',
        boxSizing: 'border-box',
        height: '33vh'
      }}
    >
      drag here
    </div>
  );
};

export default DropTarget(ItemTypes.FICHA, boardTarget, collect)(Board);
