export const STYLES = {
  game: {
    boxSizing: 'border-box',
    background: '#add0ad',
    height: '100vh',
    display: 'grid',
    gridTemplateColumns: '[status] 5em [board] auto',
    gridTemplateRows: '[board] auto [hand] 7em'
  },
  board: {
    gridColumnStart: 'board',
    gridColumnEnd: 'board'
  },
  status: {
    gridColumnStart: 'status',
    gridColumnEnd: 'status'
  },
  activePlayersHand: {
    backgroundImage:
      'linear-gradient(to right, #add0ad , rgb(163, 184, 163), #add0ad)',
    width: '100%',
    gridColumnStart: 'status',
    gridColumnEnd: 'span 2'
  }
};
