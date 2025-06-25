import { rotate2D, project3Dto2D, xyToComputerXy } from "./Tools.js";
import { drawTriangleData } from "./drawTriangle.js"
// 帧绘画函数
const drawFrame = (model, distanceZ, angle, focalLength, ctx, offset, zBufferArr) => {

  for (let i = 0; i < model.length; i++) {
    for (let j = 0; j < 3; j++) {

      // 将每一个顶点进行旋转变换
      let modelPoint = model[i][j]; // 旋转后的正方体顶点坐标
      // 新建一个点的备份，防止rotate2D时出现问题
      let pointCopy = JSON.parse(JSON.stringify(modelPoint));


      // 绕y轴旋转，转轴为物体中心
      [modelPoint.x , modelPoint.z] = [rotate2D(pointCopy.x, pointCopy.z - distanceZ, angle).x ,
      rotate2D(pointCopy.x, pointCopy.z - distanceZ, angle).y + distanceZ ] 
      // 计算旋转坐标时先将中心移至原点，再移动回原坐标，则可绕自身旋转


      // pointCopy = JSON.parse(JSON.stringify(modelPoint));
      // // 绕y轴旋转，转轴为物体中心
      // modelPoint.x = rotate2D(pointCopy.x, pointCopy.y, angle).x;
      // modelPoint.y =
      //   rotate2D(pointCopy.x, pointCopy.y, angle).y; // 计算旋转坐标时先将中心移至原点，再移动回原坐标，则可绕自身旋转


      // 二维化
      let point2D = project3Dto2D(modelPoint.x - offset.x, modelPoint.y - offset.y, modelPoint.z - offset.z, focalLength)
      model[i][j].xy = point2D  // 将二维信息记录

      point2D = (xyToComputerXy(point2D.x, point2D.y, 15, 15, 3)); // 此时数据被完全二维化

      model[i][j].computerXy = point2D  // 将计算机坐标的二维信息记录
    }
  }


  // 绘制
  for (let i = 0; i < model.length; i++) {
    let colorNum = Math.floor(255 / model.length); // 颜色跳变量
    ctx.fillStyle = `rgb(${i * colorNum*2}, ${i * colorNum}, ${i * colorNum})`; // 设置默认颜色

    ctx.fillStyle="red"
  

    drawTriangleData(
      model[i],
      ctx,
      zBufferArr
    );


  }

}












export { drawFrame };