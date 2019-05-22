import React from 'react';
import PropTypes from 'prop-types';

import { STYLES } from '../../assets/styling';

import Ficha from '../Ficha';
import boardRenderHelper from '../../helpers/boardRenderHelper';
import c from '../../constants';

class PlayBoard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { fichas, gameId } = this.props;

    const renderedOutput = Object.keys(fichas).length
      ? boardRenderHelper(fichas)
      : Array(40).fill(null);

    return (
      <div style={STYLES.board} className="board">
        <div style={STYLES.board.playable}>
          {renderedOutput.map((ficha, i) =>
            ficha ? (
              <div key={i} id={c.fichasGrid[i]} className="path">
                <Ficha
                  value={ficha.value}
                  fichaId={ficha.fichaId}
                  renderPos={ficha.renderPos}
                  fichaStyling={ficha.fichaStyling}
                />
              </div>
            ) : (
              <div
                key={i}
                id={c.fichasGrid[i]}
                className={c.fichasGrid[i] ? 'path' : null}
              >
                &nbsp;
              </div>
            )
          )}
        </div>
      </div>
    );
  }
}

PlayBoard.propTypes = {
  gameId: PropTypes.string.isRequired,
  fichas: PropTypes.object
};

export default PlayBoard;
