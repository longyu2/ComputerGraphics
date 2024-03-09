import { xyToComputerXy, translate } from "../Tools.js";
import { drawTriangleCanvas } from "../canvasTools.js";
import {
  isPointInsideTriangle,
  computeArea,
  drawTriangleData,
} from "./drawTriangle.js";

// 定义canvas
var canvas = document.getElementById("tutorial");

var ctx = canvas.getContext("2d");
ctx.strokeStyle = "red";
let focalLength = 4; // 摄像机到视平面的距离    它也可以理解为焦距，焦距越大，物体占画面的比例越大，同时最大可视角度也变小

// 采用左手系 摄像机原点为0坐标

// 定义正方体模型数据，一共12个三角面
let cube = [
  // 底面
  [
    { x: -5, y: -5, z: -5 },
    { x: 5, y: -5, z: -5 },
    { x: 5, y: -5, z: 5 },
  ],
  [
    { x: -5, y: -5, z: -5 },
    { x: -5, y: -5, z: 5 },
    { x: 5, y: -5, z: 5 },
  ],
  // 右侧
  [
    { x: 5, y: -5, z: -5 },
    { x: 5, y: 5, z: -5 },
    { x: 5, y: 5, z: 5 },
  ],
  [
    { x: 5, y: -5, z: -5 },
    { x: 5, y: -5, z: 5 },
    { x: 5, y: 5, z: 5 },
  ],
  // 后侧
  [
    { x: 5, y: -5, z: 5 },
    { x: 5, y: 5, z: 5 },
    { x: -5, y: 5, z: 5 },
  ],
  // 后侧
  [
    { x: 5, y: -5, z: 5 },
    { x: -5, y: -5, z: 5 },
    { x: -5, y: 5, z: 5 },
  ],
  //左

  [
    { x: -5, y: 5, z: 5 },
    { x: -5, y: -5, z: 5 },
    { x: -5, y: -5, z: -5 },
  ],
  [
    { x: -5, y: 5, z: 5 },
    { x: -5, y: 5, z: -5 },
    { x: -5, y: -5, z: -5 },
  ],

  // 前
  [
    { x: -5, y: 5, z: -5 },
    { x: -5, y: -5, z: -5 },
    { x: 5, y: -5, z: -5 },
  ],
  [
    { x: -5, y: 5, z: -5 },
    { x: 5, y: 5, z: -5 },
    { x: 5, y: -5, z: -5 },
  ],
  // 上
  [
    { x: -5, y: 5, z: -5 },
    { x: 5, y: 5, z: -5 },
    { x: 5, y: 5, z: 5 },
  ],
  [
    { x: -5, y: 5, z: -5 },
    { x: -5, y: 5, z: 5 },
    { x: 5, y: 5, z: 5 },
  ],
];

// 调整物体距离起点z轴的偏移
let distance = 15;

for (let i = 0; i < cube.length; i++) {
  for (let j = 0; j < cube[i].length; j++) {
    cube[i][j].z += distance;
  }
}

// 深度权重
let deep = [];

// 计算摄像机投影
const compute = (x, y, z, j) => {
  let x1 = 0;
  let y1 = 0;

  if (j > z) {
    console.error("j必须小于z,物体的z坐标必须大于焦距");
  }

  x1 = (j * x) / z;
  y1 = (j * y) / z;

  if (z < 0) {
    return null;
  }

  return { x: x1, y: y1 };
};

let cubePoint = {}; // 旋转后的正方体顶点坐标
// 新建一个点的备份，防止translate时出现问题
let pointCopy = JSON.parse(JSON.stringify(cubePoint));

// 绕x轴旋转
for (let i = 0; i < cube.length; i++) {
  for (let j = 0; j < cube[i].length; j++) {
    cubePoint = cube[i][j];
    pointCopy = JSON.parse(JSON.stringify(cubePoint));
    cubePoint.y = translate(pointCopy.y, pointCopy.z - distance, Math.PI / 3).x;
    cubePoint.z =
      translate(pointCopy.y, pointCopy.z - distance, Math.PI / 3).y + distance; // 计算旋转坐标时先将中心移至原点，再移动回原坐标，则可绕自身旋转
  }
}

let lifangti3d;

// 帧绘画函数
const draw = () => {
  ctx.clearRect(0, 0, 10000, 10000);
  let cubeProjection = [];

  // 计算6个面的深度信息
  for (let i = 0; i < cube.length; i += 1) {
    // 计算三角形深度最低值
    let min = cube[i][0].z;
    let max = cube[i][0].z;
    if (cube[i][1].z < min) {
      min = cube[i][1].z;
    }
    if (cube[i][2].z < min) {
      min = cube[i][2].z;
    }
    if (cube[i][1].z > max) {
      max = cube[i][1].z;
    }
    if (cube[i][2].z > max) {
      max = cube[i][2].z;
    }

    deep.push({
      index: i,
      deepNumber:
        min + (cube[i][0].z + cube[i][2].z + cube[i][1].z - max / 2) / 3 / 10, // 再加权三个点z坐标的平均值/10 ，这样当深度最低值相同时计算平均,去掉最大值
    });

    let pointXy = [];
    let arr = [];

    for (let j = 0; j < cube[i].length; j++) {
      cubePoint = cube[i][j];

      // 绕y轴旋转
      pointCopy = JSON.parse(JSON.stringify(cubePoint));
      cubePoint.x = translate(pointCopy.x, pointCopy.z - distance, ppp).x;
      cubePoint.z =
        translate(pointCopy.x, pointCopy.z - distance, ppp).y + distance; // 计算旋转坐标时先将中心移至原点，再移动回原坐标，则可绕自身旋转

      pointCopy = JSON.parse(JSON.stringify(cubePoint)); // 重置复制点

      pointXy.push(compute(cubePoint.x, cubePoint.y, cubePoint.z, focalLength));

      arr.push(xyToComputerXy(pointXy[j].x, pointXy[j].y, 7, 7, 71.4285));
    }

    // 进行转换
    cubeProjection.push(arr);
  }

  // 比较颜色相同的 ，取小值
  for (let i = 0; i < deep.length; i += 2) {
    if (deep[i].deepNumber > deep[i + 1].deepNumber) {
      deep[i].deepNumber = deep[i + 1].deepNumber;
    } else {
      deep[i + 1].deepNumber = deep[i].deepNumber;
    }
  }

  // 根据对象的属性排序
  const handle = (property) => {
    return function (a, b) {
      const val1 = a[property];
      const val2 = b[property];
      return val1 - val2;
    };
  };
  deep.sort(handle("deepNumber"));

  // 绘制三角面
  let styles = ["red", "blue", "green", "orange", "gray", "yellow"];

  // 根据deep来决定绘制顺序,根据deep中存储的三角面深度信息进行绘制
  for (let i = deep.length - 1; i >= 0; i--) {
    ctx.strokeStyle = styles[parseInt(deep[i].index / 2)];
    ctx.fillStyle = ctx.strokeStyle;

    // drawTriangleData(
    //   cubeProjection[deep[i].index][0],
    //   cubeProjection[deep[i].index][1],
    //   cubeProjection[deep[i].index][2],
    //   ctx
    // );

    drawTriangleCanvas(
      cubeProjection[deep[i].index][0],
      cubeProjection[deep[i].index][1],
      cubeProjection[deep[i].index][2],
      ctx
    );
  }

  deep = [];
};

// 控制单tick之间变化速度
let ppp = (2 * Math.PI) / 360 / 2; // 每个动作旋转的幅度
let index = 0;
let du = Math.PI * 2; // 指示当前角度的值

draw();

let left = true;

setInterval(() => {
  for (let i = 0; i < cube.length; i++) {
    for (let j = 0; j < cube[i].length; j++) {
      cube[i][j].z -= distance;
    }
  }

  if (distance <= 15) {
    left = false;
  } else if (distance >= 50) {
    left = true;
  }

  if (left) {
    distance -= 0.1;
  } else {
    distance += 0.1;
  }

  for (let i = 0; i < cube.length; i++) {
    for (let j = 0; j < cube[i].length; j++) {
      cube[i][j].z += distance;
    }
  }

  if (du < 0) {
    du = 2 * Math.PI;
  } else {
    du -= ppp;
  }

  draw();
}, 16.6);

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

// 检测移动
canvas.onmousemove = (e) => {
  if (mouse.isDown) {
    const changeX = mouse.prevX === 0 ? 0 : e.clientX - mouse.prevX; // 检测鼠标x移动了多少,三元，当prevX  = 0 时需要额外处理
    mouse.prevX = e.clientX; // 将此时坐标记录

    // 判断正向还是反向
    if (changeX > 0) {
      ppp = -1 * ppp;
    }
    du -= ppp;

    if (du < 0) {
      du = 2 * Math.PI;
    }

    draw();

    if (changeX > 0) {
      ppp = -1 * ppp;
    }
  }
};

canvas.onmouseup = (e) => {
  mouse.isDown = false;
  mouse.prevX = 0;
};

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
