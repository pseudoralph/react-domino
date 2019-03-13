export const fichaRenderHelper = pos => {
  console.log('rendering at: ', pos);

  const fichaStyling = [
    'fichaOnBoardLeft',
    'fichaOnBoardRight',
    'fichaOnBoardMinus90',
    'fichaOnBoardPlus90'
  ];
  if ((pos >= -12 && pos <= -5) || pos >= 6) {
    // plus 90 degree ficha styling
    return fichaStyling[3];
  } else if (pos >= -3 && pos <= 4) {
    // minus 90 degree ficha styling
    return fichaStyling[2];
  } else if (pos == 5) {
    return fichaStyling[1];
  } else if (pos == -4) {
    return fichaStyling[0];
  }

  // return fichaStyling[0];
};
