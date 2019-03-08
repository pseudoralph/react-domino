import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/Game';

// import App from './components/App';

ReactDOM.render(<Game />, document.getElementById('react-app-root'));

/*eslint-disable */
if (module.hot) {
  module.hot.accept();
}
/*eslint-disable */
