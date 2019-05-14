import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import info from '../../assets/icons/info.svg';
import '../../styles/selection.css';

const MultiMode = ({ handleInfoVis }) => {
  return (
    <div className="selection-option">
      <div>
        <p>
          <Link to="/controller">Controller</Link>
        </p>
      </div>
      <div>
        <p>
          <Link to="/display">Display</Link>
        </p>
      </div>
    </div>
  );
};

MultiMode.propTypes = {
  handleInfoVis: PropTypes.func
};

export default MultiMode;
