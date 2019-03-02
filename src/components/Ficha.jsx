import React from 'react';
import PropTypes from 'prop-types';
import { STYLES } from './assets/styling';

class Ficha extends React.Component {
  constructor(props) {
    super(props);
  }

  handleDrag(event) {
    event.dataTransfer.setData('ficha', this.props.value);
  }

  render() {
    const { value } = this.props;
    return (
      <div
        draggable
        onDragStart={event => this.handleDrag(event)}
        style={STYLES.activePlayersHand.ficha}
        className="ficha"
      >
        <p style={{ margin: 0 }}>{value[0]}</p>
        <hr />
        <p style={{ margin: 0 }}>{value[1]}</p>
      </div>
    );
  }
}

Ficha.propTypes = {
  value: PropTypes.array.isRequired
};

export default Ficha;
