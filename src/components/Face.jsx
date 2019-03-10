import React from 'react';
import PropTypes from 'prop-types';
import { STYLES } from './assets/styling';

function calcDots(value) {
  const dotPattern = [
    Array(9).fill(null), // 0
    [null, null, null, null, 'dot', null, null, null, null], // 1
    [null, null, 'dot', null, null, null, 'dot', null, null], // 2
    [null, null, 'dot', null, 'dot', null, 'dot', null, null], // 3
    ['dot', null, 'dot', null, null, null, 'dot', null, 'dot'], // 4
    ['dot', null, 'dot', null, 'dot', null, 'dot', null, 'dot'], // 5
    ['dot', null, 'dot', 'dot', null, 'dot', 'dot', null, 'dot'], // 6
    ['dot', null, 'dot', 'dot', 'dot', 'dot', 'dot', null, 'dot'], // 7
    ['dot', 'dot', 'dot', 'dot', null, 'dot', 'dot', 'dot', 'dot'], // 8
    ['dot', 'dot', 'dot', 'dot', 'dot', 'dot', 'dot', 'dot', 'dot'] // 9
  ];

  return dotPattern[value];
}

function Face(props) {
  let i = 0;
  const dotPattern = calcDots(props.value);

  return (
    <div className="face" style={STYLES.activePlayersHand.face}>
      <div
        className={dotPattern[i++]}
        style={{ ...STYLES.activePlayersHand.dot, gridColumnStart: '1' }}
      >
        &nbsp;
      </div>
      <div
        className={dotPattern[i++]}
        style={{ ...STYLES.activePlayersHand.dot, gridColumnStart: '2' }}
      >
        &nbsp;
      </div>
      <div
        className={dotPattern[i++]}
        style={{ ...STYLES.activePlayersHand.dot, gridColumnStart: '3' }}
      >
        &nbsp;
      </div>
      <div
        className={dotPattern[i++]}
        style={{ ...STYLES.activePlayersHand.dot, gridColumnStart: '1' }}
      >
        &nbsp;
      </div>
      <div
        className={dotPattern[i++]}
        style={{ ...STYLES.activePlayersHand.dot, gridColumnStart: '2' }}
      >
        &nbsp;
      </div>
      <div
        className={dotPattern[i++]}
        style={{ ...STYLES.activePlayersHand.dot, gridColumnStart: '3' }}
      >
        &nbsp;
      </div>
      <div
        className={dotPattern[i++]}
        style={{ ...STYLES.activePlayersHand.dot, gridColumnStart: '1' }}
      >
        &nbsp;
      </div>
      <div
        className={dotPattern[i++]}
        style={{ ...STYLES.activePlayersHand.dot, gridColumnStart: '2' }}
      >
        &nbsp;
      </div>
      <div
        className={dotPattern[i++]}
        style={{ ...STYLES.activePlayersHand.dot, gridColumnStart: '3' }}
      >
        &nbsp;
      </div>
    </div>
  );
}

Face.propTypes = {
  value: PropTypes.number.isRequired
};

export default Face;
