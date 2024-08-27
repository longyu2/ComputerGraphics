import { translate,compute,xyToComputerXy } from "./Tools.js";
import { drawTriangleCanvas } from "./canvasTools.js";
// 帧绘画函数
const draw = (cube,distanceZ,ppp,focalLength,ctx,offset) => {

 

    let cubePoint = {}; // 旋转后的正方体顶点坐标
    // 新建一个点的备份，防止translate时出现问题
    let pointCopy = JSON.parse(JSON.stringify(cubePoint));
    // 深度权重
    let deep = [];
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
  
      // 进行变换
      for (let j = 0; j < cube[i].length; j++) {
        cubePoint = cube[i][j];
  
        // 绕y轴旋转
        pointCopy = JSON.parse(JSON.stringify(cubePoint));
        cubePoint.x = translate(pointCopy.x, pointCopy.z - distanceZ, ppp).x;
        cubePoint.z =
          translate(pointCopy.x, pointCopy.z - distanceZ, ppp).y + distanceZ; // 计算旋转坐标时先将中心移至原点，再移动回原坐标，则可绕自身旋转
  
        pointCopy = JSON.parse(JSON.stringify(cubePoint)); // 重置复制点
  


     
        

        pointXy.push(compute(cubePoint.x-offset.x, cubePoint.y-offset.y, cubePoint.z-offset.z, focalLength));
  
        arr.push(xyToComputerXy(pointXy[j].x, pointXy[j].y, 15, 15, 66));
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

export { draw };