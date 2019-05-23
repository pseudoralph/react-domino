import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classic from '../../assets/img/classic-mode.png';

const ClassicMode = () => {
  return (
    <div className="selection-option">
      <div>
        <Link to="/classic">
          <img
            src={classic}
            className="selection-img"
            alt="classid gameplay mode"
          />
          <button className="selection-button">Classic</button>
        </Link>
        <p className="selection-info-p">
          The original 2-player game. Only playable on a desktop computer.
        </p>
      </div>
    </div>
  );
};

ClassicMode.propTypes = {
  handleInfoVis: PropTypes.func
};

export default ClassicMode;
