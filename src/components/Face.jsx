import React from 'react';
import PropTypes from 'prop-types';
import { STYLES } from './assets/styling';

function Face(props) {
  return (
    <div style={STYLES.activePlayersHand.face}>
      <div
        className="dots"
        style={{ ...STYLES.activePlayersHand.dots, gridColumnStart: '1' }}
      >
        &nbsp;
      </div>
      <div
        className="dots"
        style={{ ...STYLES.activePlayersHand.dots, gridColumnStart: '2' }}
      >
        &nbsp;
      </div>
      <div
        className="dots"
        style={{ ...STYLES.activePlayersHand.dots, gridColumnStart: '3' }}
      >
        &nbsp;
      </div>
      <div
        className="dots"
        style={{ ...STYLES.activePlayersHand.dots, gridColumnStart: '1' }}
      >
        &nbsp;
      </div>
      <div
        className="dots"
        style={{ ...STYLES.activePlayersHand.dots, gridColumnStart: '2' }}
      >
        &nbsp;
      </div>
      <div
        className="dots"
        style={{ ...STYLES.activePlayersHand.dots, gridColumnStart: '3' }}
      >
        &nbsp;
      </div>
      <div
        className="dots"
        style={{ ...STYLES.activePlayersHand.dots, gridColumnStart: '1' }}
      >
        &nbsp;
      </div>
      <div
        className="dots"
        style={{ ...STYLES.activePlayersHand.dots, gridColumnStart: '2' }}
      >
        &nbsp;
      </div>
      <div
        className="dots"
        style={{ ...STYLES.activePlayersHand.dots, gridColumnStart: '3' }}
      >
        &nbsp;
      </div>
    </div>
  );
}

Face.propTypes = {
  value: PropTypes.array.isRequired
};

export default Face;
