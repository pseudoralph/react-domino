import React from 'react';
import PropTypes from 'prop-types';
import { styling } from './styling';

const ConnectToDisplay = ({ handleDisplayConnect }) => {
  const displayGameCode = React.createRef();

  return (
    <div style={styling.box}>
      <h3>Display</h3>

      <div style={{ position: 'relative' }}>
        <input className="slection-input" type="text" ref={displayGameCode} />
        <button
          className="selection-button"
          style={styling.inlineButton}
          onClick={() => handleDisplayConnect(displayGameCode)}
        >
          Join
        </button>
      </div>
    </div>
  );
};

ConnectToDisplay.propTypes = {
  handleDisplayConnect: PropTypes.func
};

export default ConnectToDisplay;
