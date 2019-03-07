import React from 'react';
import PropTypes from 'prop-types';

import PlayerStatus from './PlayerStatus';
import { STYLES } from './assets/styling';
import { connect } from 'react-redux';

function handleDrop(event, dispatch) {
  let ficha = JSON.parse(event.dataTransfer.getData('ficha'));

  console.log(ficha);

  dispatch({
    type: 'MAKE_MOVE',
    fichaToMove: ficha.fichaId,
    player: ficha.player
  });
}

function PlayBoard(props) {
  const { dispatch } = props;

  return (
    <div
      style={STYLES.board}
      className="board"
      onDrop={event => {
        handleDrop(event, dispatch);
      }}
      onDragOver={event => {
        event.preventDefault();
      }}
    >
      <PlayerStatus />
      <div style={STYLES.board.playable}>
        <h3 style={{ textAlign: 'center' }}>PlayBoard works!</h3>
      </div>
    </div>
  );
}

PlayBoard.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const propsFromState = state => {
  return { fichasInPlay: state.fichasInPlay };
};

export default connect(propsFromState)(PlayBoard);
