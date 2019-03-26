export const fichaRenderHelper = pos => {
  const fichaStyling = [
    'fichaOnBoardLeft',
    'fichaOnBoardRight',
    'fichaOnBoardMinus90',
    'fichaOnBoardPlus90'
  ];
  if ((pos >= -12 && pos <= -5) || pos >= 6) {
    return fichaStyling[3];
  } else if (pos >= -3 && pos <= 4) {
    return fichaStyling[2];
  } else if (pos == 5) {
    return fichaStyling[1];
  } else if (pos == -4) {
    return fichaStyling[0];
  }
};
