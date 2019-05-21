import React from 'react';
import ClassicMode from './classicMode';
import MultiMode from './multiMode';
import '../../styles/selection.css';

const isMobile = () => {
  return /(iphone|ipad)/i.test(navigator.userAgent);
};

const Selection = () => {
  const handleInfoVis = htmlRef => {
    htmlRef.current.style.visibility =
      htmlRef.current.style.visibility === 'hidden' ? 'visible' : 'hidden';
  };

  return (
    <div className="selection-wrapper">
      <h1>Select a game mode</h1>
      <div className="selection-centered">
        {!isMobile() && <ClassicMode handleInfoVis={handleInfoVis} />}
        <MultiMode handleInfoVis={handleInfoVis} />
      </div>
    </div>
  );
};

export default Selection;
