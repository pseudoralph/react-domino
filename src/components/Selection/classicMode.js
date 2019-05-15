import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classic from '../../assets/img/classic-mode.png';
import info from '../../assets/icons/info.svg';
import '../../styles/selection.css';

const ClassicMode = ({ handleInfoVis }) => {
  const classicDesc = React.createRef();

  return (
    <div className="selection-option">
      <div className="selection-info-div">
        <img
          src={info}
          onClick={() => handleInfoVis(classicDesc)}
          className="selection-info-icon"
          alt="more information"
        />
      </div>
      <div>
        <Link to="/classic">
          <img
            src={classic}
            className="selection-img"
            alt="classid gameplay mode"
          />
          <button className="selection-button">Classic</button>
        </Link>
        <p
          ref={classicDesc}
          className="selection-info-p"
          style={{ visibility: 'hidden' }}
        >
          This is the classic 2-player game. Only playable on a desktop
          computer.
        </p>
      </div>
    </div>
  );
};

ClassicMode.propTypes = {
  handleInfoVis: PropTypes.func
};

export default ClassicMode;
