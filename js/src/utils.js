function entries(obj) {
  return Object.constructor.entries ? Object.entries(obj) :
    Object.keys(obj).reduce((container, key) => {
      container.push([key, obj[key]]);
      return container;
    }, []);
}

let canvas = new Array(9).fill(0).map(()=>new Array(9).fill('#'));

function drawSquare(canvas, xOffset, yOffset, d, pen) {
  if (d==1) {
    canvas[yOffset][xOffset] = pen;
  } else {
    const dir = [[1,0],[0,1],[-1,0],[0,-1]];
    let x=xOffset, y=yOffset;
    for (let dirIndex = 0; dirIndex<4; dirIndex++) {
      for (let i=1; i<xOffset+d; i++) {
        x += dir[dirIndex][0];
        y += dir[dirIndex][1];
        canvas[y][x] = pen;
      }
    }
  }
}
