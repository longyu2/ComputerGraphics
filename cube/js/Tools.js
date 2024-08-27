// 坐标系旋转
const translate = (x, y, n) => {
  const x1 = x * Math.cos(n) + Math.sin(n) * y;
  const y1 = y * Math.cos(n) - Math.sin(n) * x;
  return { x: x1, y: y1 };
};

// 从平面直角坐标系转化为屏幕坐标系
const xyToComputerXy = (x, y, W = 15, H = 15, multiple = 1) => {
  let x1 = W / 2 + x;
  let y1 = H / 2 - y;
  return { x: parseInt(x1 * multiple), y: parseInt(y1 * multiple) };
};

// 计算摄像机投影
const compute = (x, y, z, j) => {
  let x1 = 0;
  let y1 = 0;

  if (j > z) {
    // console.log("j必须小于z,物体的z坐标必须大于焦距");
  }

  x1 = (j * x) / z;
  y1 = (j * y) / z;

  if (z < 0) {
    return null;
  }

  return { x: x1, y: y1 };
};

// 绕x轴旋转
const rotateX = (cube) => {
  for (let i = 0; i < cube.length; i++) {
    for (let j = 0; j < cube[i].length; j++) {
      cubePoint = cube[i][j];
      pointCopy = JSON.parse(JSON.stringify(cubePoint));
      cubePoint.y = translate(pointCopy.y, pointCopy.z - distanceZ, Math.PI / 3).x;
      cubePoint.z =
        translate(pointCopy.y, pointCopy.z - distanceZ, Math.PI / 3).y + distanceZ; // 计算旋转坐标时先将中心移至原点，再移动回原坐标，则可绕自身旋转
    }
  }

}

export { translate, xyToComputerXy ,compute,rotateX};
