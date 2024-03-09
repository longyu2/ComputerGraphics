// canvas 画线
const drawLine = (a, b, ctx) => {
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
};

// 画三角形
const drawTriangleCanvas = (a, b, c, ctx, lineWidth = 5) => {
  ctx.lineWidth = lineWidth;
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.lineTo(c.x, c.y);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
};
//

export { drawLine, drawTriangleCanvas };

// 自己画三角形还得自己抗锯齿
// 实现一个绘制三角形函数吧
