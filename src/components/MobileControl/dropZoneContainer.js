import React from 'react';
import DropZone from './dropZone';
import PropTypes from 'prop-types';
import FichaDisplay from './FichaDisplay';

import { getLeftMostFicha, getRightMostFicha } from '../../helpers/matchers';

const Overlay = ({ children }) => {
  return (
    <div
      style={{
        transform: 'rotate(-90deg)',
        display: 'inline-block'
      }}
    >
      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', zIndex: 1 }}>
        {React.cloneElement(children, {
          transform: { zIndex: -1 }
        })}
      </div>
    </div>
  );
};

const DropZoneContainer = ({ dispatch, fichasInPlay, isActivePlayer }) => {
  console.log(fichasInPlay); //eslint-disable-line no-console
  let leftMost, rightMost, only;

  if (!Object.keys(fichasInPlay).length) {
    return (
      <div className="drop-zone-container-wrapper">
        <div className="dragzone-container-waiting">
          {isActivePlayer ? (
            <DropZone
              dispatch={dispatch}
              side={'left'}
              dropStyling={'dropzone'}
            >
              <p>Make the first move</p>
            </DropZone>
          ) : (
            'Waiting on opponent to move'
          )}
        </div>
      </div>
    );
  } else if (Object.keys(fichasInPlay).length === 1) {
    only = getLeftMostFicha(fichasInPlay);

    return (
      <div className="drop-zone-container-wrapper">
        <DropZone
          dispatch={dispatch}
          side="left"
          dropStyling={'dropzone dropzone-left'}
        />
        <Overlay>
          <FichaDisplay value={only.value} />
        </Overlay>
        <DropZone
          dispatch={dispatch}
          side="right"
          dropStyling={'dropzone dropzone-right'}
        />
      </div>
    );
  } else if (Object.keys(fichasInPlay).length > 1) {
    leftMost = getLeftMostFicha(fichasInPlay);
    rightMost = getRightMostFicha(fichasInPlay);

    return (
      <div className="drop-zone-container-wrapper">
        <h3>drag here</h3>
        <div>
          <DropZone
            dispatch={dispatch}
            side="left"
            assistFicha={leftMost}
            transform={{ transform: 'rotate(-90deg)' }}
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
  }
};

DropZoneContainer.propTypes = {
  dispatch: PropTypes.func,
  fichasInPlay: PropTypes.object
};

export default DropZoneContainer;
