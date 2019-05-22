export const STYLES = {
  board: {
    backgroundColor: 'rgb(173, 208, 173)',
    display: 'grid',
    gridTemplateColumns: '[playable] auto',
    gridRow: 'board / stats',
    status: {
      gridRow: 'status / status',
      // backgroundColor: 'red',
      height: '5em'
    },
    playable: {
      padding: ' 0 1em',
      borderRadius: '.25em',
      backgroundColor: 'rgb(141, 179, 141)',
      margin: '1em auto -1em',
      gridColumn: 'playable / playable',
      gridTemplateRows: 'repeat(9, 4.9em)',
      gridTemplateColumns: 'repeat(7, 7em)',
      display: 'grid',
      boxSizing: 'border-box'
    },
    path: { alignSelf: 'center', fontSize: '11px' }
  },
  fichaStyling: {
    fichaDisplayLeft: {
      border: '1px solid #7a7a7a',
      boxShadow: '2px -2px 0px 0px rgb(108, 107, 105)',
      transform: 'rotate(0deg)',
      bottom: '0',
      position: 'unset',
      margin: '-10px 10px'
    },
    fichaDisplayRight: {
      border: '1px solid #7a7a7a',
      boxShadow: '2px -2px 0px 0px rgb(108, 107, 105)',
      transform: 'rotate(0deg)',
      bottom: '0',
      position: 'unset',
      margin: '-15px 52px'
    },
    fichaDisplayMinus90: {
      border: '1px solid #7a7a7a',
      boxShadow: '2px 2px 0px 0px rgb(108, 107, 105)',
      transform: 'rotate(-90deg)',
      bottom: '0',
      position: 'unset',
      margin: '-10px 30px'
    },
    fichaDisplayPlus90: {
      border: '1px solid #7a7a7a',
      boxShadow: '-2px -2px 0px 0px rgb(108, 107, 105)',
      transform: 'rotate(90deg)',
      bottom: '0',
      position: 'unset',
      margin: '-6px 0px -14px 32px'
    }
  }
};
