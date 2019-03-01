import React from 'react';
import PropTypes from 'prop-types';
import { STYLES } from './assets/styling';

class Ficha extends React.Component {
  constructor(props) {
    super(props);

    console.log(props);
  }

  handleDrag() {
    event.dataTransfer.setData('ficha', this.props.value);

    this.props.onFichaTransfer(this.props.value);
  }

  render() {
    const { value } = this.props;
    return (
      <div
        draggable
        onDragStart={() => this.handleDrag(event)}
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
  value: PropTypes.array.isRequired,
  onFichaTransfer: PropTypes.func.isRequired
};

export default Ficha;
