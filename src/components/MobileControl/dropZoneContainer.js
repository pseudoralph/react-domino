import React from 'react';
import DropZone from './dropZone';
import PropTypes from 'prop-types';
import FichaDisplay from './FichaDisplay';

import { getLeftMostFicha, getRightMostFicha } from '../../helpers/matchers';
import SpinningFicha from '../../assets/SpinningFicha';

const Overlay = ({ children, placement }) => {
  const definedMargin = '2.5rem';
  const marginOffset =
    placement === 'left'
      ? { marginRight: definedMargin }
      : placement === 'right'
      ? { marginLeft: definedMargin }
      : null;
  const gradientOverlay =
    placement === 'left'
      ? {
          backgroundImage: 'linear-gradient(180deg, #ffffff00 , #8db38d)',
          backgroundColor: 'unset'
        }
      : placement === 'right'
      ? {
          backgroundImage: 'linear-gradient(180deg, #8db38d, #ffffff00)',
          backgroundColor: 'unset'
        }
      : null;
  return (
    <div
      style={{
        transform: 'rotate(-90deg)',
        display: 'inline-block',
        position: 'relative',
        top: '-.65rem',
        ...marginOffset
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.25)',
          zIndex: 1,
          borderRadius: '0.33em',
          ...gradientOverlay
        }}
      >
        {React.cloneElement(children, {
          transform: { zIndex: -1 }
        })}
      </div>
    </div>
  );
};

const DropZoneContainer = ({ dispatch, fichasInPlay, isActivePlayer }) => {
  let leftMost, rightMost, only;

  if (!Object.keys(fichasInPlay).length) {
    return (
      <div className="drop-zone-container-wrapper">
        {isActivePlayer ? (
          <div>
            <DropZone
              dispatch={dispatch}
              side={'left'}
              dropStyling={'dropzone'}
            >
              <SpinningFicha />
            </DropZone>
            <p>Place your first piece</p>
          </div>
        ) : (
          <div className="dragzone-container-waiting">
            Waiting on player 1 to move...
          </div>
        )}
      </div>
    );
  } else if (Object.keys(fichasInPlay).length === 1) {
    only = getLeftMostFicha(fichasInPlay);

    return (
      <div className="drop-zone-container-wrapper">
        <div className="drop-zone-container-with-fichas">
          <DropZone
            dispatch={dispatch}
            side="left"
            dropStyling={'dropzone dropzone-left'}
          />
          <Overlay>
            <FichaDisplay fichaStyling={'dropZoneView'} value={only.value} />
          </Overlay>
          <DropZone
            dispatch={dispatch}
            side="right"
            dropStyling={'dropzone dropzone-right'}
          />
        </div>
      </div>
    );
  } else if (Object.keys(fichasInPlay).length > 1) {
    leftMost = getLeftMostFicha(fichasInPlay);
    rightMost = getRightMostFicha(fichasInPlay);

    return (
      <div className="drop-zone-container-wrapper">
        <div className="drop-zone-container-with-fichas">
          <DropZone
            dispatch={dispatch}
            side="left"
            dropStyling={'dropzone dropzone-left'}
          />
          <Overlay placement={'left'}>
            <FichaDisplay
              fichaStyling={'dropZoneView'}
              value={leftMost.value}
            />
          </Overlay>
          <Overlay placement={'right'}>
            <FichaDisplay
              fichaStyling={'dropZoneView'}
              value={rightMost.value}
            />
          </Overlay>
          <DropZone
            dispatch={dispatch}
            side="right"
            dropStyling={'dropzone dropzone-right'}
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
