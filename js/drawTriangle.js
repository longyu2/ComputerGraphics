import { calculateNormal } from "./Tools.js"; // 引入工具函数

// 计算三角面积，本函数内全部使用屏幕坐标系
const computeArea = (a, b, c) => {
  //  S=1/2[(x1y2-x2y1)+(x2y3-x3y2)+(x3y1-x1y3)]。 此面积公式在平面直角坐标系中逆时针生效，屏幕坐标系顺时针生效
  if ((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x) < 0) {
    //  // 为true 则在屏幕坐标系为逆时针，此时将abc更改为顺时针,下面的公式必须在顺时针才能计算面积
    let p = b;
    b = c;
    c = p;
  }

  return (
    (a.x * b.y - b.x * a.y + b.x * c.y - c.x * b.y + c.x * a.y - a.x * c.y) / 2 // 顺时针算面积公式
  );
};

// 判断点是否在三角形内
const isPointInsideTriangle = (a, b, c, point) => {
  const ABD = computeArea(a, b, point);
  const ACD = computeArea(a, c, point);
  const BCD = computeArea(b, c, point);
  const ABC = computeArea(a, b, c);

  return ABC === ABD + ACD + BCD; // 面积法，相等则在三角形内
};


/**
* 计算三角面的重心
* @param {Object} p1 - 顶点1 {x, y, z}
* @param {Object} p2 - 顶点2 {x, y, z}
* @param {Object} p3 - 顶点3 {x, y, z}
* @returns {Object} 重心坐标 {x, y, z}
*/
function calculateCentroid(p1, p2, p3) {
  return {
    x: (p1.x + p2.x + p3.x) / 3,
    y: (p1.y + p2.y + p3.y) / 3,
    z: (p1.z + p2.z + p3.z) / 3
  };
}


/**
 * 计算从三角面重心到光源的归一化光照向量
 * @param {Object} centroid - 重心坐标 {x, y, z}
 * @param {Object} lightPos - 光源位置 {x, y, z}
 * @returns {Object} 归一化的光照向量 {x, y, z}
 */
function calculateLightVector(centroid, lightPos) {
  const vector = {
    x: lightPos.x - centroid.x,
    y: lightPos.y - centroid.y,
    z: lightPos.z - centroid.z
  };

  // 归一化向量
  const magnitude = Math.sqrt(
    vector.x * vector.x +
    vector.y * vector.y +
    vector.z * vector.z
  );

  return magnitude > 0
    ? { x: vector.x / magnitude, y: vector.y / magnitude, z: vector.z / magnitude }
    : { x: 0, y: 0, z: 0 };
}

/**
 * 计算三角面法向量与光照向量的点积（使用重心）
 * @param {Object} p1 - 顶点1 {x, y, z}
 * @param {Object} p2 - 顶点2 {x, y, z}
 * @param {Object} p3 - 顶点3 {x, y, z}
 * @param {Object} lightPos - 光源位置 {x, y, z}
 * @param {Function} computeNormal - 计算法向量的函数（用户提供）
 * @returns {Number} 点积结果（范围：[-1, 1]）
 */
function calculateLightingDotProduct(p1, p2, p3, lightPos, computeNormal) {
  // 1. 计算三角面重心
  const centroid = calculateCentroid(p1, p2, p3);

  // 2. 计算从重心到光源的光照向量（归一化）
  const lightVector = calculateLightVector(centroid, lightPos);

  // 3. 调用用户提供的法向量计算函数（结果应为归一化向量）
  const normal = calculateNormal(p1, p2, p3);

  // 4. 计算点积（范围：[-1, 1]）
  const result = dotProduct(normal, lightVector);

  // 5. 确保数值稳定性（避免浮点数误差导致的微小超出范围）
  return Math.max(-1, Math.min(1, result));
}


/**
  * 计算两个向量的点积
  * @param {Object} vec1 - 向量1 {x, y, z}
  * @param {Object} vec2 - 向量2 {x, y, z}
  * @returns {Number} 点积结果
  */
function dotProduct(vec1, vec2) {
  return vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z;
}


/**
 * 矫正三角形顶点顺序（通过引用修改原始对象）
 * @param {Object} p1 - 顶点1 {x, y, z}
 * @param {Object} p2 - 顶点2 {x, y, z}
 * @param {Object} p3 - 顶点3 {x, y, z}
 */
function fixTriangleOrder(p1, p2, p3) {
  // 计算当前顶点顺序的法向量
  const edge1 = { x: p2.x - p1.x, y: p2.y - p1.y, z: p2.z - p1.z };
  const edge2 = { x: p3.x - p1.x, y: p3.y - p1.y, z: p3.z - p1.z };
  
  const normal = {
    x: edge1.y * edge2.z - edge1.z * edge2.y,
    y: edge1.z * edge2.x - edge1.x * edge2.z,
    z: edge1.x * edge2.y - edge1.y * edge2.x
  };
  
  // 与参考法向量(z轴正方向)的点积
  const referenceNormal = { x: 0, y: 0, z: 1 };
  const dotProduct = normal.z; // 简化计算，因参考向量仅z轴有值
  
  // 若点积为负，交换p2和p3的属性值
  if (dotProduct < 0) {
    // 使用临时变量交换p2和p3
    const temp = { ...p2 };
    Object.assign(p2, p3);
    Object.assign(p3, temp);
  }
}



// 使用光栅绘制三角形
const drawTriangleData = (triangleArr, ctx, zBufferArr) => {
  //




  fixTriangleOrder(triangleArr[0],triangleArr[1],triangleArr[2])

  // 测试数据
  const [p1,p2,p3] = triangleArr

  const lightPos = { x: 0, y: 100, z: 500 };

  // 计算点积（光照强度因子）
  const dotResult = calculateLightingDotProduct(p1, p2, p3, lightPos, calculateNormal);


  ctx.fillStyle = `rgba(${Math.floor(255 * dotResult)}, ${Math.floor(255 * dotResult)}, ${Math.floor(255 * dotResult)}, 1)`; // 根据点积结果设置颜色




  triangleArr.sort((a, b) => a.computerXy.y - b.computerXy.y)   // 根据对象属性的值进行排序，现在是按照y值进行排序
  let [A, B, C] = [triangleArr[0], triangleArr[1], triangleArr[2]]; // 取三个顶点的屏幕坐标
















  // 取三个顶点的屏幕坐标
  const arr = [A.computerXy, B.computerXy, C.computerXy]
  let [maxX, maxY, minX, minY] = [arr[0].x, arr[0].y, arr[0].x, arr[0].y];

  // 确定包围盒
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].x > maxX) {
      maxX = arr[i].x
    }
    if (arr[i].y > maxY) {
      maxY = arr[i].y
    }
    if (arr[i].x < minX) {
      minX = arr[i].x
    }
    if (arr[i].y < minY) {
      minY = arr[i].y
    }
  }

  // 三角形上半
  for (let i = minY; i < B.computerXy.y; i++) {
    for (let j = minX; j < maxX; j++) {


      const point = { x: j, y: i };
      if (isPointInsideTriangle(arr[0], arr[1], arr[2], point)) {
        // 不需要分左右,因为交换 lz 于 rz 最后计算出来的z值完全一样，只是在左中lz 和右中的lz完全颠倒，但最后计算每个像素点的z是一样的
        // 因为从左插值到右，和从右插值到左是完全一样的
        // 这里也是默认B在C的右边，如果B在C的左边，这里的lz其实是rz
        let pixelZ
        let leftZ = A.z + (C.z - A.z) * ((i - minY) / (C.computerXy.y - A.computerXy.y))
        let rightZ = A.z + (B.z - A.z) * ((i - minY) / (B.computerXy.y - A.computerXy.y))
        let leftX = A.computerXy.x + (C.computerXy.x - A.computerXy.x) * ((i - minY) / (C.computerXy.y - A.computerXy.y))
        let rightX = A.computerXy.x + (B.computerXy.x - A.computerXy.x) * (i - minY) / (B.computerXy.y - A.computerXy.y)
        let lineWidth = rightX - leftX



        // 根据j，线性插值求当前像素z
        pixelZ = (leftZ + (rightZ - leftZ) / lineWidth * (j - leftX))
        byZSetPixel(zBufferArr, i, j, pixelZ, ctx)
      }
    }

  }
  // 三角形下半
  for (let i = B.computerXy.y; i < C.computerXy.y; i++) {
    for (let j = minX; j < maxX; j++) {


      const point = { x: j, y: i };

      if (isPointInsideTriangle(arr[0], arr[1], arr[2], point)) {

        // 这里实际计算的rz是B在c的右边的结果，如果b在c的左边，则计算出来的rz其实是lz,但都不影响最后计算的z值
        // 不分左右,因为交换 lz 于 rz 最后计算出来的z值完全一样
        let rightZ = B.z + (C.z - B.z) * ((i - B.computerXy.y) / (C.computerXy.y - B.computerXy.y))
        let leftZ = A.z + (C.z - A.z) * ((i - minY) / (C.computerXy.y - A.computerXy.y))
        let rightX = B.computerXy.x + (C.computerXy.x - B.computerXy.x) * ((i - B.computerXy.y) / (C.computerXy.y - B.computerXy.y))
        let leftX = A.computerXy.x + (C.computerXy.x - A.computerXy.x) * (i - minY) / (C.computerXy.y - A.computerXy.y)
        let lineWidth = rightX - leftX
        // 根据j，线性插值求当前像素z
        let pixelZ = (leftZ + (rightZ - leftZ) / lineWidth * (j - leftX))

        // 根据j求当前z
        byZSetPixel(zBufferArr, i, j, pixelZ, ctx)
      }
    }

  }

}


const byZSetPixel = (zBufferArr, i, j, pixelZ, ctx) => {
  if (j < 0 || j >= 1000 || i < 0 || i >= 1000) {
    return; // 越界
  }

  // 只有小于深度缓存数组的像素才会被渲染
  if (zBufferArr[i][j] > pixelZ) {

    // pixelZ = 1 / pixelZ //
    // let color = (pixelZ - 24.5) * 256 / 1.5    // 根据z值计算颜色,也就是生成深度图
    // ctx.fillStyle = `rgb(${color},${color},${color})`
    ctx.fillRect(j, i - 200, 1, 1)
    zBufferArr[i][j] = pixelZ
  }
}

export { isPointInsideTriangle, computeArea, drawTriangleData };
