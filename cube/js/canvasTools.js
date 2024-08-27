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
  // ctx.fill();
};
//


// 实现canvas 图形
// var myImageData = ctx.createImageData(10, 10);
// for (let i = 0; i < 10; i++) {
//   for (let j = 0; j < 10; j++) {
//     myImageData.data[j * 40 + i * 4 + 0] = 255;
//     myImageData.data[j * 40 + i * 4 + 1] = 0;

//     myImageData.data[j * 40 + i * 4 + 2] = 0;
//     myImageData.data[j * 40 + i * 4 + 3] = 255;
//   }
// }

// console.log(myImageData.data);

// ctx.putImageData(myImageData, 700, 500);

// var myImageData2 = ctx.getImageData(150, 170, 10, 10);

// ctx.putImageData(myImageData2, 500, 500);

// console.log(myImageData2.data);

// drawTriangleData(
//   {
//     x: 700,
//     y: 500,
//   },
//   {
//     x: 600,
//     y: 600,
//   },
//   {
//     x: 800,
//     y: 600,
//   },
//   ctx
// );

// -----C 700,500

// A  600,600         B 800,600


export { drawLine, drawTriangleCanvas };

// 自己画三角形还得自己抗锯齿
// 实现一个绘制三角形函数吧
