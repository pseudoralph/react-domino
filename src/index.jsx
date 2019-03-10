import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/Game';

ReactDOM.render(<Game />, document.getElementById('react-app-root'));

/*eslint-disable */
if (module.hot) {
  module.hot.accept();
}
/*eslint-disable */
