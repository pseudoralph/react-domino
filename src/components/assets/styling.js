export const STYLES = {
  gameSelect: {
    footer: {
      image: { width: '22px', padding: '0 .5em', verticalAlign: 'middle' },
      lineHeight: '1.2em',
      padding: '.5em 0 0',
      position: 'fixed',
      bottom: '0',
      width: '100%',
      height: '2em',
      textAlign: 'left',
      left: '0',
      color: 'white',
      background: 'rgb(64, 78, 67)',
      fontWeight: 100
    },
    image: {
      opacity: '.8',
      position: 'fixed',
      bottom: '0',
      right: '0',
      marginBottom: '2.5em'
    },
    zIndex: 99,
    boxShadow: '1px 1px 4px 0px rgba(64, 78, 67, 0.55)',
    padding: '1em',
    textAlign: 'center',
    display: 'table',
    width: '300px',
    margin: '5em auto',
    height: '30em',
    borderRadius: '.5em',
    background: 'rgba(152, 179, 152, 0.9)',
    button: {
      join: {
        cursor: 'pointer',
        margin: '10em 0 0',
        display: 'inline-block',
        color: 'rgb(255, 255, 255)',
        backgroundColor: 'rgb(64, 78, 67)',
        border: '1px solid transparent',
        padding: '0.375rem 0.75rem',
        fontSize: '1rem',
        lineHeight: '1.5',
        borderRadius: '0.25rem',
        width: '66%'
      },
      cursor: 'pointer',
      margin: '3em 1em 4em',
      display: 'inline-block',
      color: '#fff',
      backgroundColor: 'rgb(64, 78, 67)',
      borderColor: '#1e7e34',
      border: '1px solid transparent',
      padding: '.375rem .75rem',
      fontSize: '1rem',
      lineHeight: '1.5',
      borderRadius: '.25rem'
    },
    input: {
      textAlign: 'center',
      display: 'block',
      width: '85%',
      padding: '.5em',
      fontSize: '1.2em',
      fontWeight: '400',
      lineHeight: '1.5em',
      color: 'rgb(73, 80, 87)',
      backgroundColor: 'rgb(255, 255, 255)',
      border: '1px solid rgb(206, 212, 218)',
      borderRadius: '0.25rem',
      boxSizing: 'border-box',
      margin: '0 auto'
    }
  },

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
