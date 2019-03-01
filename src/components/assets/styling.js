export const STYLES = {
  game: {
    display: 'grid',
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
    margin: '.66em',
    padding: '.33em',
    position: 'fixed',
    top: '0',
    left: '0'
  },
  player: {
    icon: { border: '1px solid black', fontSize: '4em', margin: '0' },
    textAlign: 'center'
  },
  activePlayersHand: {
    backgroundImage:
      'linear-gradient(to right, rgb(173, 208, 173) , rgb(153, 185, 153), rgb(173, 208, 173))',
    width: '100%',
    gridRowStart: 'hand',
    gridRowEnd: 'hand'
  },
  ficha: {
    display: 'inline-block',
    background: 'ivory'
  }
};
