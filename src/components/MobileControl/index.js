import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { watchHand, watchGame } from '../../actions';
// import Draggable from 'react-beautiful-dnd';

// class MobileControl extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   componentWillMount() {
//     console.log('ok!');

//     this.props.dispatch(
//       watchHand(
//         this.props.location.state.gameId,
//         this.props.location.state.player
//       )
//     );
//     this.props.dispatch(watchGame(this.props.location.state.gameId));
//   }

//   render() {
//     return (
//       <div>
//         {this.props.location.state
//           ? `game id: ${this.props.location.state.gameId}`
//           : 'you made it here alone'}
//       </div>
//     );
//   }
// }

const MobileControl = props => {
  useEffect(() => {
    props.dispatch(
      watchHand(props.location.state.gameId, props.location.state.player)
    );
    props.dispatch(watchGame(props.location.state.gameId));
    console.log('ok');
  }, []);

  return (
    <div>
      {props.location.state
        ? `game id: ${props.location.state.gameId}`
        : 'you made it here alone'}
    </div>
  );
};

MobileControl.propTypes = {
  location: PropTypes.object
};

export default connect()(MobileControl);
