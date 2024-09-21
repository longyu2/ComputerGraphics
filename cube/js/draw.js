import { translate, compute, xyToComputerXy } from "./Tools.js";
import { drawTriangleCanvas } from "./canvasTools.js";
import { drawTriangleData } from "../drawTriangle.js"
// 帧绘画函数
const draw = (cube, distanceZ, ppp, focalLength, ctx, offset,zBufferArr) => {

  
  


  let model2D = JSON.parse(JSON.stringify(cube)) // 定义模型二维数据，带原坐标和二维化后的坐标


  for (let i = 0; i < cube.length; i++) {
    for (let j = 0; j < 3; j++) {
      // 将每一个顶点进行旋转变换
      let cubePoint = cube[i][j];; // 旋转后的正方体顶点坐标
      // 新建一个点的备份，防止translate时出现问题
      let pointCopy = JSON.parse(JSON.stringify(cubePoint));


      // 绕y轴旋转，转轴为物体中心
      cubePoint.x = translate(pointCopy.x, pointCopy.z - distanceZ, ppp).x;
      cubePoint.z =
        translate(pointCopy.x, pointCopy.z - distanceZ, ppp).y + distanceZ; // 计算旋转坐标时先将中心移至原点，再移动回原坐标，则可绕自身旋转


      // 二维化
      let point2D = (compute(cubePoint.x - offset.x, cubePoint.y - offset.y, cubePoint.z - offset.z, focalLength));
      cube[i][j].xy = point2D  // 将二维信息记录


      console.log(point2D);
      point2D = (xyToComputerXy(point2D.x, point2D.y, 15, 15, 66)); // 此时数据被完全二维化

      cube[i][j].computerXy = point2D  // 将计算机坐标的二维信息记录
    }
  }


  // 绘制
  for (let i = 0; i < cube.length; i++) {

    if (i==0 || i==1) {
      ctx.fillStyle="blue"
    }
    if (i==2 || i==3 ) {
      ctx.fillStyle="red"
    }
    if (i==4 ||i==5) {
      ctx.fillStyle="green"
    }
    if (i==6 ||i==7) {
      ctx.fillStyle="orange"
    }
    if (i==8 ||i==9) {
      ctx.fillStyle="violet"
    }
    if (i==10 ||i==11) {
      ctx.fillStyle="black"
    }
    // drawTriangleData(
    //   cube[i],
    //   ctx,
    //   zBufferArr
    // );

    console.log(cube[i]);
    drawTriangleCanvas(
      cube[i][0].computerXy,
      cube[i][2].computerXy,
      cube[i][1].computerXy,    // 把这一行注释掉可以看到奇怪的图形
      ctx
    );
  }

}












export { draw };