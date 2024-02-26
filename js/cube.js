import { xyToComputerXy, translate } from "./Tools.js";
import { drawLine, drawTriangle } from "./canvasTools.js";

// 定义canvas
var canvas = document.getElementById("tutorial");
var ctx = canvas.getContext("2d");
ctx.strokeStyle = "red";
let distance = 4; // 摄像机到视平面的距离    它也可以理解为焦距，焦距越大，物体占画面的比例越大，同时最大可视角度也变小

// 采用左手系 摄像机原点为0坐标

// 定义正方体模型数据，一共12个三角面
let cube = [
  // 底面
  [
    { x: -5, y: -5, z: 10 },
    { x: 5, y: -5, z: 10 },
    { x: 5, y: -5, z: 20 },
  ],
  [
    { x: -5, y: -5, z: 10 },
    { x: -5, y: -5, z: 20 },
    { x: 5, y: -5, z: 20 },
  ],
  // 右侧
  [
    { x: 5, y: -5, z: 10 },
    { x: 5, y: 5, z: 10 },
    { x: 5, y: 5, z: 20 },
  ],
  [
    { x: 5, y: -5, z: 10 },
    { x: 5, y: -5, z: 20 },
    { x: 5, y: 5, z: 20 },
  ],
  // 后侧
  [
    { x: 5, y: -5, z: 20 },
    { x: 5, y: 5, z: 20 },
    { x: -5, y: 5, z: 20 },
  ],
  // 后侧
  [
    { x: 5, y: -5, z: 20 },
    { x: -5, y: -5, z: 20 },
    { x: -5, y: 5, z: 20 },
  ],
  //左

  [
    { x: -5, y: 5, z: 20 },
    { x: -5, y: -5, z: 20 },
    { x: -5, y: -5, z: 10 },
  ],
  [
    { x: -5, y: 5, z: 20 },
    { x: -5, y: 5, z: 10 },
    { x: -5, y: -5, z: 10 },
  ],

  // 前
  [
    { x: -5, y: 5, z: 10 },
    { x: -5, y: -5, z: 10 },
    { x: 5, y: -5, z: 10 },
  ],
  [
    { x: -5, y: 5, z: 10 },
    { x: 5, y: 5, z: 10 },
    { x: 5, y: -5, z: 10 },
  ],
  // 上
  [
    { x: -5, y: 5, z: 10 },
    { x: 5, y: 5, z: 10 },
    { x: 5, y: 5, z: 20 },
  ],
  [
    { x: -5, y: 5, z: 10 },
    { x: -5, y: 5, z: 20 },
    { x: 5, y: 5, z: 20 },
  ],
];

// 深度权重
let deep = [];

// 计算摄像机投影
function compute(x, y, z, j) {
  let x1 = 0;
  let y1 = 0;

  if (j > z) {
    console.error("j必须小于z");
  }
  x1 = (j * x) / z;
  y1 = (j * y) / z;

  return { x: x1, y: y1 };
}
let center = { z: 15 }; // 先计算出正方体中心的z坐标
let cubePoint = {}; // 旋转后的正方体顶点坐标
// 新建一个点的备份，防止translate时出现问题
let pointCopy = JSON.parse(JSON.stringify(cubePoint));

// 绕x轴旋转
for (let i = 0; i < cube.length; i++) {
  for (let j = 0; j < cube[i].length; j++) {
    cubePoint = cube[i][j];

    pointCopy = JSON.parse(JSON.stringify(cubePoint));
    cubePoint.y = translate(pointCopy.y, pointCopy.z - center.z, Math.PI / 5).x;
    cubePoint.z =
      translate(pointCopy.y, pointCopy.z - center.z, Math.PI / 5).y + center.z; // 计算旋转坐标时先将中心移至原点，再移动回原坐标，则可绕自身旋转
  }
}

let lifangti3d;
// 帧绘画函数
function draw() {
  ctx.clearRect(0, 0, 10000, 10000);
  let cubeProjection = [];

  // 根据对象的属性排序
  const handle = (property) => {
    return function (a, b) {
      const val1 = a[property];
      const val2 = b[property];
      return val1 - val2;
    };
  };

  for (let i = 0; i < cube.length; i++) {
    // 计算6个面的深度信息

    deep.push({
      index: i,
      deepNumber: ((cube[i][0].z + cube[i][1].z) / 2 + cube[i][2].z) / 2,
    });

    // for (let i = 0; i < cube.length; i++) {
    //     console.log(cube[i]);
    //     center.z += cube[i].z
    //     if(i===cube.length-1){
    //         console.log(center.z);
    //         center.z /= 8   // 取8顶点的平均z
    //     }
    // }

    let pointXy = [];
    let arr = [];

    for (let j = 0; j < cube[i].length; j++) {
      cubePoint = cube[i][j];
      // 绕y旋转

      // 绕y轴旋转
      pointCopy = JSON.parse(JSON.stringify(cubePoint));
      cubePoint.x = translate(pointCopy.x, pointCopy.z - center.z, du).x;
      cubePoint.z =
        translate(pointCopy.x, pointCopy.z - center.z, du).y + center.z; // 计算旋转坐标时先将中心移至原点，再移动回原坐标，则可绕自身旋转

      pointCopy = JSON.parse(JSON.stringify(cubePoint)); // 重置复制点

      pointXy.push(compute(cubePoint.x, cubePoint.y, cubePoint.z, distance));

      arr.push(xyToComputerXy(pointXy[j].x, pointXy[j].y, 7, 7, 71.4285));
    }

    // 进行转换
    cubeProjection.push(arr);
  }

  // 绘制三角面

  let styles = ["red", "blue", "green", "orange", "gray", "yellow"];

  deep[6].deepNumber -= 7;
  deep[3].deepNumber -= 8;

  //   对每个面的deep进行平均,取大值
  for (let i = 0; i < deep.length; i += 2) {
    deep[i].deepNumber = (deep[i].deepNumber + deep[i + 1].deepNumber) / 2;
    deep[i + 1].deepNumber = deep[i + 1].deepNumber;
  }
  deep.sort(handle("deepNumber"));
  console.table(deep);

  // 根据deep来决定绘制顺序,根据deep中存储的三角面深度信息进行绘制
  for (let i = deep.length - 1; i >= 0; i--) {
    ctx.strokeStyle = styles[parseInt(deep[i].index / 2)];

    console.log(deep[i].index);
    console.log(Math.round(deep[i].index / 2));
    console.log(ctx.strokeStyle);
    ctx.fillStyle = ctx.strokeStyle;
    // ctx.clearRect(0, 0, 10000, 10000);
    drawTriangle(
      cubeProjection[deep[i].index][0],
      cubeProjection[deep[i].index][1],
      cubeProjection[deep[i].index][2],
      ctx
    );
  }

  deep = [];
}

// 控制单tick之间变化速度
let ppp = (2 * Math.PI) / 360 / 2900; // 每个动作旋转的幅度
let index = 0;
let du = 2 * Math.PI;

draw();

// setInterval(() => {
//   if (du < 0) {
//     du = 2 * Math.PI;
//   } else {
//     du -= ppp;
//   }

//   if (distance > 0) {
//     // distance-=0.05
//     for (let i = 0; i < cube.length; i++) {
//       const element = cube[i];
//       //   element.z += 0.1;
//     }
//   }

//   draw();
// }, 16.6);

// 定义一个监控鼠标的类
// class mouse {
//     x
//     y
//     isDown
//     prevX
//     constructor() {
//         this.x = 0
//         this.y = 0
//         this.isDown = false
//         this.prevX = 0
//     }
// }

// 记录鼠标坐标
const mouse = {
  x: 0,
  y: 0,
  isDown: false,
  prevX: 0,
};

// 鼠标控制旋转, 目前只实现了x坐标旋转
canvas.onmousedown = (e) => {
  mouse.isDown = true;
};

canvas.onmousemove = (e) => {
  if (mouse.isDown) {
    const changeX = mouse.prevX === 0 ? 0 : e.clientX - mouse.prevX; // 检测鼠标x移动了多少,三元，当prevX  = 0 时需要额外处理
    mouse.prevX = e.clientX;
    du -= (((2 * Math.PI) / 360) * 0.28 * changeX) / 20; // 根据改变量绘图

    if (du < 0) {
      du = 2 * Math.PI;
    }
    draw();
  }
};

canvas.onmouseup = (e) => {
  mouse.isDown = false;
  mouse.prevX = 0;
};

draw();
