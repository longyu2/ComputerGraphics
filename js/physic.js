import { drawLine } from "./canvasTools.js";

// 定义canvas
var canvas = document.getElementById("tutorial");
var ctx = canvas.getContext("2d");

// 定义质点类
class point {
  m;

  x;
  y;
  force;
  speed;
  constructor(m, x, y) {
    this.m = m;
    this.x = x;
    this.y = y;
    this.force = {
      number: 0, // 受力的数值
      direction: 0, // 受力的方向,以右方作为起点
    };
    this.speed = {
      number: 0, // 速度的数值
      direction: 0, // 速度的方向,以右方作为起点
    };
  }
}

const po = new point(100, 10, 10);
const po2 = new point(100, 40, 40);

// 定义牛顿定律
ctx.strokeStyle = "red";
ctx.fillStyle = "red";
ctx.beginPath();

ctx.arc(po.x, po.y, 5, 0, 6.28);
ctx.arc(po2.x, po2.y, 5, 0, 6.28);
ctx.fill();
ctx.stroke();

//为其施加一个推力
// po.force = {
//   number: po.m * 10,
//   direction: 0,
// };

const init = () => {
  window.requestAnimationFrame(draw);
};

let frap = 0;

// 绘制函数，根据元素当前状态绘制出下一帧的状态并渲染
const draw = () => {
  // 根据位置计算引力
  let juLi = Math.sqrt((po.x - po2.x) ** 2 + (po.y - po2.y) ** 2);

  if (juLi < 2) {
    return;
  }

  po.force.direction = Math.atan((po2.y - po.y) / (po2.x - po.x));
  po2.force.direction = Math.atan((po.y - po2.y) / (po.x - po2.x));

  console.log(`poD:${(po2.y - po.y) / (po2.x - po.x)}`);
  console.log(`po2D:${(po.y - po2.y) / (po.x - po2.x)}`);

  po.force.number = (300 * po.m * po2.m) / juLi ** 2;
  po2.force.number = (300 * po.m * po2.m) / juLi ** 2;

  // 根据力计算加速度
  const a = po.force.number / po.m;
  // 根据加速度,每帧时间计算速度
  po.speed.number += a * 0.016;
  po.speed.direction = po.force.direction;

  // 根据力计算加速度
  const a2 = po2.force.number / po2.m;
  // 根据加速度,每帧时间计算速度
  po2.speed.number += a * 0.016;
  po2.speed.direction = po2.force.direction;

  // 计算出位移
  const weiYi = po.speed.number * 0.016 + 0.5 * a * 0.016 ** 2;

  // 根据方向进行位移分解
  // po.x += weiYi *  Math.cos(po.speed.direction);
  // po.y += weiYi *  Math.sin(po.speed.direction);
  // po2.x += weiYi *  Math.cos(po2.speed.direction);
  // po2.y += weiYi *  Math.sin(po2.speed.direction);

  // 根据引力方向进行分解
  po.y += weiYi * ((po2.y - po.y) / juLi);
  po.x += weiYi * ((po2.x - po.x) / juLi);

  po2.y += weiYi * ((po.y - po2.y) / juLi);
  po2.x += weiYi * ((po.x - po2.x) / juLi);

  console.log(po.x, po.y, po2.x, po2.y);

  console.log(`位移${weiYi}`);
  // console.log(`速度${po.speed.number}`);

  ctx.clearRect(0, 0, 1920, 1000);
  ctx.strokeStyle = "rgba(0,0,0,0.2)";
  // 画点格子
  for (let i = 0; i < 1920; i += 10) {
    drawLine({ x: i, y: 0 }, { x: i, y: 1920 }, ctx);
    drawLine({ x: 0, y: i }, { x: 1920, y: i }, ctx);
  }

  ctx.beginPath();
  ctx.arc(po.x * 10, po.y * 10, 5, 0, 6.28);
  ctx.arc(po2.x * 10, po2.y * 10, 5, 0, 6.28);

  ctx.fill();
  ctx.stroke();

  frap++;
  if (po.x > 8) {
    // return;
  }

  window.requestAnimationFrame(draw);
};

init();
