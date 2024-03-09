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

export { translate, xyToComputerXy };
