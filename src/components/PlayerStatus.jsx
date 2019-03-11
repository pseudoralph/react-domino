import React from 'react';
import PropTypes from 'prop-types';
import Player from './Player';
import { STYLES } from './assets/styling';
import { connect } from 'react-redux';

function PlayerStatus(props) {
  const { status, gameId } = props;
  return (
    <div>
      <div className="status" style={STYLES.status}>
        <Player name={'Ralph'} isComputer={false} />
        <Player name={'Computer'} isComputer={true} />
      </div>

      <div>
        game code: {gameId}
        <br />
        active player: {status.activePlayer}
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return { status: state.gameStatus };
};

PlayerStatus.propTypes = {
  dispatch: PropTypes.func.isRequired,
  gameId: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(PlayerStatus);
