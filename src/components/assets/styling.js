export const STYLES = {
  fichaStyling: {
    fichaInHand: {
      borderBottom: '1px solid #7a7a7a',
      borderLeft: '1px solid #7a7a7a',
      boxShadow: '4px -4px 0px 0px rgb(108, 107, 105)'
    },
    fichaOnBoardLeft: {
      borderBottom: '1px solid #7a7a7a',
      borderLeft: '1px solid #7a7a7a',
      boxShadow: '4px -4px 0px 0px rgb(108, 107, 105)',
      transform: 'rotate(0deg) scale(.85)',
      bottom: 'unset',
      position: 'unset',
      margin: '-10px 0'
    },
    fichaOnBoardRight: {
      borderBottom: '1px solid #7a7a7a',
      borderLeft: '1px solid #7a7a7a',
      boxShadow: '4px -4px 0px 0px rgb(108, 107, 105)',
      transform: 'rotate(0deg) scale(.85)',
      bottom: 'unset',
      position: 'unset',
      margin: '-25px 55px'
    },
    fichaOnBoardMinus90: {
      // horiz positions -3 through 4
      borderTop: '1px solid #7a7a7a',
      borderLeft: '1px solid #7a7a7a',
      boxShadow: '4px 4px 0px 0px rgb(108, 107, 105)',

      transform: 'rotate(-90deg) scale(.85)',
      bottom: 'unset',
      position: 'unset',
      margin: '-40px 30px'
    },
    fichaOnBoardPlus90: {
      // horiz positions -12 through -5 and 6 through 13
      borderBottom: '1px solid #7a7a7a',
      borderRight: '1px solid #7a7a7a',
      boxShadow: '-4px -4px 0px 0px rgb(108, 107, 105)',

      transform: 'rotate(90deg) scale(.85)',
      bottom: 'unset',
      position: 'unset',
      margin: '-40px 30px'
    }
  },

  game: {
    display: 'grid',
    gridTemplateRows: '[board] auto [hand] 7em',
    boxSizing: 'border-box',
    background: '#add0ad',
    height: '100vh'
  },
  board: {
    display: 'grid',
    gridTemplateColumns: '[status] 10em [playable] auto',
    gridRow: 'board / board',

    playable: {
      gridColumn: 'playable / playable',
      gridTemplateRows: 'repeat(5, 1fr)',
      gridTemplateColumns: 'repeat(8, 140px)',
      display: 'grid',
      border: '1px solid #b6b6b638',
      height: '100%',
      boxSizing: 'border-box'
    },
    gridRowStart: 'board',
    gridRowEnd: 'board'
  },
  status: {
    gridColumn: 'status / status',
    border: '1px solid black'
  },
  player: {
    icon: { border: '1px solid black', fontSize: '4em', margin: '0' },
    textAlign: 'center'
  },
  activePlayersHand: {
    fichas: { display: 'table', margin: '0 auto' },
    ficha: {
      bottom: '50px',
      position: 'relative',
      display: 'inline-block',
      margin: '10px',
      background: 'rgb(255, 253, 235)',
      borderRadius: '0.33em'
    },
    face: {
      padding: '10px',
      width: '50px',
      gridTemplateColumns: 'repeat(3,1 fr)',
      gridTemplateRows: 'repeat(3, 1 fr)',
      gridColumnGap: '5px',
      gridRowGap: '5px',
      display: 'inline-grid',
      cursor: 'pointer'
    },
    dot: {
      height: '13px',
      width: '13px'
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
