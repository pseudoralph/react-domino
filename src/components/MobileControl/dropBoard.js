import React from 'react';
import DropZone from './DropZone';
import PropTypes from 'prop-types';

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
        <DropZone dispatch={dispatch} side="right" />
      </div>
    </div>
  );
};

DropBoard.propTypes = {
  dispatch: PropTypes.func
};

export default DropBoard;
