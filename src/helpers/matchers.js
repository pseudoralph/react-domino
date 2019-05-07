export const matchLeft = (presentBoard, ficha) => {
  const leftMost = Object.values(presentBoard).sort(function(a, b) {
    return a.renderPos - b.renderPos;
  })[0];
  if (ficha.value.indexOf(leftMost.top) == 0) {
    return 'flip';
  }
  return (
    ficha.value.includes(leftMost.top) &&
    leftMost.renderPos - 1 == ficha.position
  );
};

export const matchRight = (presentBoard, ficha) => {
  const rightMost = Object.values(presentBoard).sort(function(a, b) {
    return b.renderPos - a.renderPos;
  })[0];
  if (ficha.value.indexOf(rightMost.bottom) == 1) {
    return 'flip';
  }
  return (
    ficha.value.includes(rightMost.bottom) &&
    rightMost.renderPos + 1 == ficha.position
  );
};
