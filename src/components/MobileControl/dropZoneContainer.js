import React from 'react';
import DropZone from './dropZone';
import PropTypes from 'prop-types';
import { getLeftMostFicha, getRightMostFicha } from '../../helpers/matchers';

const DropZoneContainer = ({ dispatch, fichasInPlay }) => {
  console.log(fichasInPlay); //eslint-disable-line no-console
  let leftMost, rightMost;

  if (Object.keys(fichasInPlay).length === 1) {
    console.log('has one'); //eslint-disable-line no-console
  } else if (Object.keys(fichasInPlay).length > 1) {
    leftMost = getLeftMostFicha(fichasInPlay);
    rightMost = getRightMostFicha(fichasInPlay);
  }

  return (
    <div className="drop-zone-container-wrapper">
      <h3>drag here</h3>
      <div style={{ display: 'table', textAlign: 'center', margin: '0 auto' }}>
        <DropZone
          dispatch={dispatch}
          side="left"
          assistFicha={leftMost}
          transform={{ transform: 'rotate(90deg)' }}
        />
        <DropZone
          dispatch={dispatch}
          side="right"
          assistFicha={rightMost}
          transform={{ transform: 'rotate(-90deg)' }}
        />
      </div>
    </div>
  );
};

DropZoneContainer.propTypes = {
  dispatch: PropTypes.func,
  fichasInPlay: PropTypes.object
};

export default DropZoneContainer;
