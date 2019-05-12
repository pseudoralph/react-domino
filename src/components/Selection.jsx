import React from 'react';
import { Link } from 'react-router-dom';

const Selection = () => {
  return (
    <div>
      <h1>Select game mode blow</h1>

      <ul>
        <li>
          <Link to="/classic">Classic</Link>
        </li>

        <li>
          <Link to="/controller">Controller</Link>
        </li>
        <li>
          <Link to="/display">Display</Link>
        </li>
      </ul>
    </div>
  );
};

export default Selection;
