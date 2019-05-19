import React from 'react';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../../constants/itemTypes';
import { makeMove } from '../../actions';

const dropBoardTarget = {
  drop(props, monitor) {
    const direction = props.side === 'left' ? -99 : 99;
    props.dispatch(
      makeMove({ ...monitor.getItem(), writable: true }, direction)
    );
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    drop: monitor.getItem()
  };
}

const DropZone = ({ side, connectDropTarget }) => {
  const dropStyling = {
    display: 'inline-block',
    width: '4em',
    backgroundColor: 'grey',
    padding: '1em',
    margin: '1em'
  };

  return connectDropTarget(
    <div id={side} style={dropStyling}>
      {side}
    </div>
  );
};

export default DropTarget(ItemTypes.FICHA, dropBoardTarget, collect)(DropZone);
