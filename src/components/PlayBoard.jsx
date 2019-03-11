import React from 'react';
import PropTypes from 'prop-types';
import { makeMove } from './actions';
import PlayerStatus from './PlayerStatus';
import { STYLES } from './assets/styling';
import { connect } from 'react-redux';
import { watchBoard } from './actions';
import Ficha from './Ficha';
import c from './constants';

class PlayBoard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(watchBoard(this.props.gameId));
  }

  handleDrop(event, dispatch) {
    console.log(event);
    let ficha = JSON.parse(event.dataTransfer.getData('ficha'));
    // dispatch(moveValidator(ficha))
    dispatch(makeMove(ficha));
  }

  renderHelper() {
    const { fichas } = this.props;
    let fichasArrangement = [];

    c.fichasGrid.map(gridPos => {
      if (gridPos === Object.values(fichas)[0].renderPos) {
        fichasArrangement.push(Object.values(fichas)[0]);
      } else fichasArrangement.push(null);
    });

    return fichasArrangement;
  }

  render() {
    const { dispatch, fichas } = this.props;

    const renderedOutput = Object.keys(fichas).length
      ? this.renderHelper()
      : Array(40).fill(null);

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
          {renderedOutput.map((ficha, i) =>
            ficha ? (
              <div key={i}>
                <Ficha
                  boardStyling={STYLES.board.fichaOnBoard}
                  value={ficha.value}
                  fichaId={ficha.fichaId}
                  renderPos={ficha.renderPos}
                />
              </div>
            ) : (
              <div key={i}>&nbsp;</div>
            )
          )}
        </div>
      </div>
    );
  }
}

PlayBoard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  gameId: PropTypes.string.isRequired,
  fichas: PropTypes.object
};

const propsFromState = state => {
  return { fichas: state.fichasInPlay };
};

export default connect(propsFromState)(PlayBoard);
