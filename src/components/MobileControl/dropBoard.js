import React, { useEffect } from 'react';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../../constants/itemTypes';
import DropZone from './DropZone';

const DropBoard = ({ dispatch }) => {
  return (
    <div
      style={{
        width: '100%',
        border: '5px dashed black',
        padding: '1em',
        boxSizing: 'border-box'
      }}
    >
      <h3>drag here</h3>
      <div style={{ display: 'table', textAlign: 'center', margin: '0 auto' }}>
        <DropZone dispatch={dispatch} side="left" />
        {/* <DropZone dispatch={dispatch} side="zero" /> */}
        <DropZone dispatch={dispatch} side="right" />
      </div>
    </div>
  );
};

export default DropBoard;

// export default DropTarget(ItemTypes.FICHA, dropBoardTarget, collect)(DropBoard);
