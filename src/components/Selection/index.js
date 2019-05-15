import React from 'react';
import ClassicMode from './classicMode';
import MultiMode from './multiMode';

const Selection = props => {
  const handleInfoVis = htmlRef => {
    htmlRef.current.style.visibility =
      htmlRef.current.style.visibility === 'hidden' ? 'visible' : 'hidden';
  };

  const handleRedir = gameInfo => {
    props.history.push('/controller', { something: true });
  };

  console.log(props);
  return (
    <div className="selection-wrapper">
      <h1>Select a game mode</h1>
      <div>
        <ClassicMode handleInfoVis={handleInfoVis} />
        <MultiMode handleInfoVis={handleInfoVis} handleRedir={handleRedir} />
      </div>
    </div>
  );
};

export default Selection;
