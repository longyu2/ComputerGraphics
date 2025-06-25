import { xyToComputerXy, project3Dto2D, } from "./Tools.js";
import { drawLine, } from "./canvasTools.js";
import { drawFrame } from "./draw.js";
import { distanceZ, moedels } from "./model.js";




//  初始化画布canvas
const canvas = document.getElementById("tutorial");
let ctx = canvas.getContext("2d");




let focalLength = 15; // 摄像机到视平面的距离，也就是焦距，焦距越大，物体占画面的比例越大，同时最大可视角度也变小

// 表示世界坐标与摄像机坐标的差值，这样只需更该此差，则可实现摄像机的移动
let Camera = { x: 0, y: 0, z: 0 }


// 深度缓存数组！
let zBufferArr

// 初始化z-buffer数组，1000*1000的二维数组，初始值为25600

const initZBuffer = () => {
  zBufferArr = []
  for (let i = 0; i < 1000; i++) {
    let arr = []
    for (let j = 0; j < 1000; j++) {
      arr.push(25600)
    }
    zBufferArr.push(arr)
  }
}

initZBuffer() // 初始化z-buffer数组



// 控制旋转速度
let angle = (2 * Math.PI) / 360 / 1 * 2; // 每个动作旋转的幅度



/** 绘制地面*/
const ground = (Camera) => {
  for (let i = -90; i < 90; i += 8) {
    ctx.strokeStyle = "black"
    ctx.lineWidth = 0.2
    let [xcx, xcy] = [project3Dto2D(i - Camera.x, -30 - Camera.y, 30 - Camera.z, focalLength), project3Dto2D(i - Camera.x, -30 - Camera.y, 225 - Camera.z, focalLength)]


    drawLine(xyToComputerXy(xcx.x, xcx.y, 15, 15, 66), xyToComputerXy(xcy.x, xcy.y, 15, 15, 66), ctx)

    let [ycx, ycy] = [project3Dto2D(-90 - Camera.x, -30 - Camera.y, i + 140 - Camera.z, focalLength), project3Dto2D(90 - Camera.x, -30 - Camera.y, i + 140 - Camera.z, focalLength)]
    drawLine(xyToComputerXy(ycx.x, ycx.y, 15, 15, 66), xyToComputerXy(ycy.x, ycy.y, 15, 15, 66), ctx)
  }
}

Camera.y+=1


// 绘制单帧
const renderFrame = () => {
  ctx.clearRect(0, 0, 1000, 1000)
  ground(Camera)



  // 让模型旋转


  // 将所有模型一一绘制
  for (let i = 0; i < moedels.length; i++) {
    drawFrame(moedels[i], distanceZ, angle, focalLength, ctx, Camera, zBufferArr);
  }

  initZBuffer() // 单帧绘制完成，重置深度缓存
  calculateFPS();
  window.requestAnimationFrame(renderFrame)
}

// 计算帧率
let lastTime = performance.now();
let frameCount = 0;

const calculateFPS = () => {
  frameCount++;
  const currentTime = performance.now();
  const elapsed = currentTime - lastTime;

  if (elapsed >= 1000) {
    document.querySelector("#fps").innerHTML = `FPS: ${frameCount}`;
    frameCount = 0;
    lastTime = currentTime;
  }
}



renderFrame()







