import { drawLine } from "./canvasTools.js";

// 定义canvas
var canvas = document.getElementById("tutorial");
var ctx = canvas.getContext("2d");

// 定义质点类
class point {
  m;
  v;
  x;
  y;
  force;
  speed;
  constructor(m = 0, v = 0, x = 0, y = 0) {
    this.m = m;
    this.v = v;
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

const po = new point(100);

// 定义牛顿定律
ctx.strokeStyle = "red";
ctx.fillStyle = "red";
ctx.beginPath();

ctx.arc(100, 100, 10, 0, 6.28);
ctx.fill();
ctx.stroke();

//为其施加一个推力
po.force = {
  number: po.m * 10,
  direction: 0,
};

const init = () => {
  window.requestAnimationFrame(draw);
};

let frap = 0;

// 绘制函数，根据元素当前状态绘制出下一帧的状态并渲染
const draw = () => {
  // 根据力计算加速度
  const a = po.force.number / po.m;
  // 根据加速度,每帧时间计算速度
  po.speed.number += a * 0.016;

  console.log(po.speed.number);
  // 计算出位移
  const weiYi = po.speed.number * 0.016 + 0.5 * a * 0.016 ** 2;
  po.x += weiYi;

  //   console.log(`位移${weiYi}`);
  console.log(`速度${po.speed.number}`);

  ctx.clearRect(0, 0, 1920, 1000);
  ctx.strokeStyle = "rgba(0,0,0,0.2)";
  // 画点格子
  for (let i = 0; i < 1920; i += 10) {
    drawLine({ x: i, y: 0 }, { x: i, y: 1920 }, ctx);
    drawLine({ x: 0, y: i }, { x: 1920, y: i }, ctx);
  }

  ctx.beginPath();

  ctx.arc(po.x * 10, 100, 10, 0, 6.28);
  ctx.fill();
  ctx.stroke();

  frap++;
  if (po.x > 8) {
    alert(frap);
    return;
  }

  window.requestAnimationFrame(draw);
};

init();
