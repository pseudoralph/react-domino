import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classic from '../assets/img/classic-mode.png';
import info from '../assets/icons/info.svg';
import '../styles/selection.css';

const Selection = () => {
  const classicDesc = React.createRef();

  const handleInfoVis = htmlRef => {
    htmlRef.current.style.visibility =
      htmlRef.current.style.visibility === 'hidden' ? 'visible' : 'hidden';
  };

  return (
    <div className="selection-wrapper">
      <h1>Select a game mode</h1>

      <div className="selection-option">
        <img
          onClick={() => handleInfoVis(classicDesc)}
          style={{ width: '1em', cursor: 'pointer' }}
          src={info}
          alt="more information"
        />
        <Link to="/classic">
          <img
            src={classic}
            style={{ width: '15em' }}
            alt="classid gameplay mode"
          />
          <p className="selection-button-look">Classic</p>
        </Link>
        <div style={{ textAlign: 'left', paddingTop: '1em' }}>
          <img
            onClick={() => handleInfoVis(classicDesc)}
            style={{ width: '1em', cursor: 'pointer' }}
            src={info}
            alt="more information"
          />
          <p
            style={{
              color: 'white',
              padding: 0,
              margin: 0,
              visibility: 'hidden',
              fontWeight: 100
            }}
            ref={classicDesc}
          >
            This is the classic 2-player game. Only playable on a desktop
            computer.
          </p>
        </div>
      </div>

      <div className="selection-option">
        <p>
          <Link to="/controller">Controller</Link>
        </p>
        <p>
          <Link to="/display">Display</Link>
        </p>
      </div>
    </div>
  );
};

export default Selection;
