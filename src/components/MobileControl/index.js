import React, { useState } from 'react';
import randomWords from 'random-words';
import { connect } from 'react-redux';
import { startGame, grabFichas } from '../../actions';
// import Draggable from 'react-beautiful-dnd';

// handleHostGame() {
//   const gameId = randomWords(2).join('-');
//   this.setState({ gameId, player: 'p1' });
//   this.dispatch(startGame(gameId));
//   this.dispatch(grabFichas(gameId, 'p1'));
// }

// handleJoinGame(joinCode) {
//   const gameId = joinCode.current.value;

//   this.setState({ gameId, player: 'p2' });
//   this.dispatch(grabFichas(gameId, 'p2'));
// }

const MobileControl = ({ dispatch }) => {
  const [gameId, setGameId] = useState(null);

  const handleIsHosting = () => {
    const randomGameId = randomWords(2).join('-');
    const player = 'p1';

    setGameId(randomGameId);

    dispatch(startGame(randomGameId));
    dispatch(grabFichas(randomGameId, player));
  };

  const handleIsJoining = joinCode => {
    const player = 'p2';
    dispatch(grabFichas(gameId, player));
  };

  const joinCode = React.createRef();

  return (
    <div>
      <button id="host" onClick={handleIsHosting}>
        Host
      </button>
      <button id="join" onClick={handleIsJoining}>
        Join
      </button>
    </div>
  );
};

export default connect()(MobileControl);
