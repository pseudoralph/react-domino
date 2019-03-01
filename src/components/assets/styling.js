export const STYLES = {
  game: {
    display: 'grid',
    // gridTemplateColumns: 'auto',
    gridTemplateRows: '[board] auto [hand] 7em',

    boxSizing: 'border-box',
    background: '#add0ad',
    height: '100vh'
  },
  board: {
    gridRowStart: 'board',
    gridRowEnd: 'board'
  },
  status: {
    border: '1px solid black',
    // display: 'inline-block',
    margin: '.66em',
    padding: '.33em',
    position: 'fixed',
    top: '0',
    left: '0'
  },
  player: {},
  activePlayersHand: {
    backgroundImage:
      'linear-gradient(to right, #add0ad , rgb(163, 184, 163), #add0ad)',
    width: '100%',
    gridRowStart: 'hand',
    gridRowEnd: 'hand'
  }
};
