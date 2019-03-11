import React from 'react';
import PropTypes from 'prop-types';
import { makeMove } from './actions';
import PlayerStatus from './PlayerStatus';
import { STYLES } from './assets/styling';
import { connect } from 'react-redux';
import { watchBoard } from './actions';
import Ficha from './Ficha';

class PlayBoard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(watchBoard(this.props.gameId));
  }

  handleDrop(event, dispatch) {
    let ficha = JSON.parse(event.dataTransfer.getData('ficha'));
    dispatch(makeMove(ficha));
  }

  render() {
    const { dispatch, gameId, fichas } = this.props;

    return (
      <div
        style={STYLES.board}
        className="board"
        onDrop={event => {
          this.handleDrop(event, dispatch);
        }}
        onDragOver={event => {
          event.preventDefault();
        }}
      >
        <PlayerStatus />
        <div style={STYLES.board.playable}>
          {Object.values(fichas).map(ficha => (
            <div key={ficha.fichaId}>
              <Ficha
                onBoardStyling={STYLES.board.fichaOnBoard}
                value={ficha.value}
                fichaId={ficha.fichaId}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

PlayBoard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  gameId: PropTypes.string.isRequired
};

const propsFromState = state => {
  return { fichas: state.fichasInPlay };
};

export default connect(propsFromState)(PlayBoard);
