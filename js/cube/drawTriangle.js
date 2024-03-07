import { colorToRGB } from "../color.js";

// 判断点是否在三角形内
const isPointInsideTriangle = (a, b, c, point) => {
  const ABD = computeArea(a, b, point);
  const ACD = computeArea(a, c, point);
  const BCD = computeArea(b, c, point);
  const ABC = computeArea(a, b, c);

  return ABC === ABD + ACD + BCD; // 面积法，相等则在三角形内
};

// 计算三角面积，本函数内全部使用屏幕坐标系
const computeArea = (a, b, c) => {
  //  S=1/2[(x1y2-x2y1)+(x2y3-x3y2)+(x3y1-x1y3)]。 此面积公式在平面直角坐标系中逆时针生效，屏幕坐标系顺时针生效
  if ((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x) < 0) {
    //  // 为true 则在屏幕坐标系为逆时针，此时将abc更改为顺时针,下面的公式必须在顺时针才能计算面积
    let p = b;
    b = c;
    c = p;
  }

  return (
    (a.x * b.y - b.x * a.y + b.x * c.y - c.x * b.y + c.x * a.y - a.x * c.y) / 2 // 顺时针算面积公式
  );
};

// 使用光栅绘制三角形
const drawTriangleData = (a, b, c, ctx) => {
  // 绘制三角形前置准备
  const arr = [a, b, c];
  let [maxX, maxY, minX, minY] = [arr[0].x, arr[0].y, arr[0].x, arr[0].y];

  // 计算出包含三角形的矩形区域
  arr.forEach((element) => {
    if (element.x > maxX) {
      maxX = element.x;
    }

    if (element.x < minX) {
      minX = element.x;
    }
    if (element.y > maxY) {
      maxY = element.y;
    }
    if (element.y < minY) {
      minY = element.y;
    }
  });

  let [width, height] = [maxX - minX, maxY - minY];

  let colorArr = colorToRGB(ctx.fillStyle);

  for (let y = minY; y <= maxY; y++) {
    let count = 0;
    let left = 0;
    let leftCheck = true;
    for (let x = minX; x <= maxX; x++) {
      const point = { x: x, y: y };
      let [xx, yy] = [x - minX, y - minY];
      if (isPointInsideTriangle(a, b, c, point)) {
        if (leftCheck) {
          left = xx;
          leftCheck = false;
        }

        // 对每一个点，都得确定深度，这里需要从此坐标发出一条射线，与原物相交
        count++;
      }
    }

    console.log(count);
    ctx.fillRect(minX + 200 + left, y + 400, count, 1);
  }

  var timestampEnd = Date.parse(new Date());
};

export { isPointInsideTriangle, computeArea, drawTriangleData };
