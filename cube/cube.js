import { xyToComputerXy, translate, compute, rotateX } from "./js/Tools.js";
import { drawLine, drawTriangleCanvas } from "./js/canvasTools.js";
import {
  isPointInsideTriangle,
  computeArea,
  drawTriangleData,
} from "./drawTriangle.js";
import { draw } from "./js/draw.js";
import { distanceZ, moedels } from "./js/model.js";
import { rotateImage } from "./js/ratateImage.js";




//  初始化画布canvas
var canvas = document.getElementById("tutorial");
let ctx = canvas.getContext("2d");
ctx.strokeStyle = "red";



let focalLength = 15; // 摄像机到视平面的距离，也就是焦距，焦距越大，物体占画面的比例越大，同时最大可视角度也变小
// 表示世界坐标与摄像机坐标的差值，这样只需更该此差，则可实现摄像机的移动
let offset = { x: 0, y: 0, z: 0 }


// 深度缓存数组！
let zBufferArr = new Array()
for (let i = 0; i < 1000; i++) {
  let arr = new Array()
  for (let j = 0; j < 1000; j++) {
    arr.push(256)
  }
  zBufferArr.push(arr)
}




// 控制旋转速度
let ppp = (2 * Math.PI) / 360 / 4; // 每个动作旋转的幅度
let index = 0;




/** 键盘前进后退 */
const logKey = (e) => {
  if (e.keyCode === 38 && offset.z < 30) {
    offset.z += 1
  }

  if (e.keyCode === 40) {
    offset.z -= 1
  }

  if (e.key === "ArrowLeft") {

    offset.x -= 1
  }

  if (e.key === "ArrowRight") {
    offset.x += 1
  }
}
document.querySelector("body").addEventListener("keydown", logKey);


const move = (cube) => {
  for (let i = 0; i < cube.length; i++) {
    for (let j = 0; j < cube[i].length; j++) {
      cube[i][j].z -= distanceZ;
    }
  }

  if (distanceZ <= 15) {
    left = false;
  } else if (distanceZ >= 50) {
    left = true;
  }

  if (left) {
    distanceZ -= 0.1;
  } else {
    distanceZ += 0.1;
  }

  for (let i = 0; i < cube.length; i++) {
    for (let j = 0; j < cube[i].length; j++) {
      cube[i][j].z += distanceZ;
    }
  }
}


let left = true;


/** 绘制地面*/
const ground = (offset) => {
  for (let i = -90; i < 90; i += 8) {
    ctx.strokeStyle = "black"
    ctx.lineWidth = 0.2
    let [xcx, xcy] = [compute(i - offset.x, -30 - offset.y, 30 - offset.z, focalLength), compute(i - offset.x, -30 - offset.y, 225 - offset.z, focalLength)]


    drawLine(xyToComputerXy(xcx.x, xcx.y, 15, 15, 66), xyToComputerXy(xcy.x, xcy.y, 15, 15, 66), ctx)

    let [ycx, ycy] = [compute(-90 - offset.x, -30 - offset.y, i + 140 - offset.z, focalLength), compute(90 - offset.x, -30 - offset.y, i + 140 - offset.z, focalLength)]
    drawLine(xyToComputerXy(ycx.x, ycx.y, 15, 15, 66), xyToComputerXy(ycy.x, ycy.y, 15, 15, 66), ctx)
  }
}



// console.log(zBufferArr);
// 绘制单帧
const renderFrame = () => {

  console.log(moedels);

  ctx.clearRect(0, 0, 1000, 1000)
  ground(offset)

  // rotateImage(ctx,du,offset,focalLength)   // 绘制旋转图片

  // 将所有模型一一绘制
  for (let i = 0; i < moedels.length; i++) {


    draw(moedels[i], distanceZ, ppp, focalLength, ctx, offset, zBufferArr);
  }


  zBufferArr = []
  for (let i = 0; i < 1000; i++) {
    let arr = new Array()
    for (let j = 0; j < 1000; j++) {
      arr.push(256)
    }
    zBufferArr.push(arr)
  }



  window.requestAnimationFrame(renderFrame)
}
// 记录鼠标坐标
// const mouse = {
//   x: 0,
//   y: 0,
//   isDown: false,
//   prevX: 0,
// };
// 鼠标控制旋转, 目前只实现了x坐标旋转
// canvas.onmousedown = (e) => {
//   mouse.isDown = true;
// };
// 鼠标移动
// canvas.onmousemove = (e) => {
//   if (mouse.isDown) {
//     const changeX = mouse.prevX === 0 ? 0 : e.clientX - mouse.prevX; // 检测鼠标x移动了多少,三元，当prevX  = 0 时需要额外处理
//     mouse.prevX = e.clientX; // 将此时坐标记录

//     // 判断正向还是反向
//     if (changeX > 0) {
//       ppp = -1 * ppp;
//     }


//     ctx.clearRect(0, 0, 1000, 1000)
//     ground(offset)

//     // draw(cube,distanceZ,ppp,focalLength,ctx,offset);
//     console.log(distanceZ);
//     if (changeX > 0) {
//       ppp = -1 * ppp;
//     }
//   }
// };

// canvas.onmouseup = (e) => {
//   mouse.isDown = false;
//   mouse.prevX = 0;
// };

setTimeout(() => {
  renderFrame()

}, 500)





