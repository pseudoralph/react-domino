export const STYLES = {
  game: {
    display: 'grid',
    gridTemplateRows: '[board] auto [hand] 7em',

    boxSizing: 'border-box',
    background: '#add0ad',
    height: '100vh'
  },
  board: {
    playable: {
      border: '1px solid #b6b6b638;',
      height: '100%',
      boxSizing: 'border-box'
    },
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
    fichas: { display: 'table', margin: '0 auto' },
    ficha: {
      borderBottom: '1px solid #7a7a7a',
      boxShadow: '4px -4px 0px 0px rgb(108, 107, 105)',
      bottom: '50px',
      position: 'relative',
      display: 'inline-block',
      margin: '10px',
      background: 'rgb(255, 253, 235)',
      borderRadius: '0.33em',
      borderLeft: '1px solid #7a7a7a'
    },
    face: {
      // margin: '10px',
      padding: '10px',
      width: '50px',
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1 fr)',
      gridTemplateRows: 'repeat(3, 1 fr)',
      gridColumnGap: '5px',
      gridRowGap: '5px',
      display: 'inline-grid',
      cursor: 'pointer'
    },
    dots: {
      boxShadow: 'inset 0px 0px 14px 2px #000000',
      height: '13px',
      width: '13px',
      // background: 'radial-gradient(#000000, #868686)',
      borderRadius: '100%'
    },
    line: {
      margin: '0 5px'
    },
    backgroundImage:
      'linear-gradient(to right, rgb(173, 208, 173) , rgb(153, 185, 153), rgb(173, 208, 173))',
    width: '100%',
    gridRowStart: 'hand',
    gridRowEnd: 'hand'
  }
};
