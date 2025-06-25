
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



// 使用光栅绘制三角形
const drawTriangleData = (triangleArr, ctx, zBufferArr) => {
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

      // 不需要分左右,因为交换 lz 于 rz 最后计算出来的z值完全一样，只是在左中lz 和右中的lz完全颠倒，但最后计算每个像素点的z是一样的
      // 因为从左插值到右，和从右插值到左是完全一样的
      // 这里也是默认B在C的右边，如果B在C的左边，这里的lz其实是rz
      let pixelZ
      let leftZ = A.z + (C.z - A.z) * ((i - minY) / (C.computerXy.y - A.computerXy.y))
      let rightZ = A.z + (B.z - A.z) * ((i - minY) / (B.computerXy.y - A.computerXy.y))
      let leftX = A.computerXy.x + (C.computerXy.x - A.computerXy.x) * ((i - minY) / (C.computerXy.y - A.computerXy.y))
      let rightX = A.computerXy.x + (B.computerXy.x - A.computerXy.x) * (i - minY) / (B.computerXy.y - A.computerXy.y)
      let lineWidth = rightX - leftX
      const point = { x: j, y: i };


      if (isPointInsideTriangle(arr[0], arr[1], arr[2], point)) {
        // 根据j，线性插值求当前像素z
        pixelZ = (leftZ + (rightZ - leftZ) / lineWidth * (j - leftX))
        byZSetPixel(zBufferArr, i, j, pixelZ, ctx)
      }
    }

  }
  // 三角形下半
  for (let i = B.computerXy.y; i < C.computerXy.y; i++) {
    for (let j = minX; j < maxX; j++) {

      // 这里实际计算的rz是B在c的右边的结果，如果b在c的左边，则计算出来的rz其实是lz,但都不影响最后计算的z值
      // 不分左右,因为交换 lz 于 rz 最后计算出来的z值完全一样
      let rightZ = B.z + (C.z - B.z) * ((i - B.computerXy.y) / (C.computerXy.y - B.computerXy.y))
      let leftZ = A.z + (C.z - A.z) * ((i - minY) / (C.computerXy.y - A.computerXy.y))
      let rightX = B.computerXy.x + (C.computerXy.x - B.computerXy.x) * ((i - B.computerXy.y) / (C.computerXy.y - B.computerXy.y))
      let leftX = A.computerXy.x + (C.computerXy.x - A.computerXy.x) * (i - minY) / (C.computerXy.y - A.computerXy.y)
      let lineWidth = rightX - leftX
      const point = { x: j, y: i };
      // 根据j，线性插值求当前像素z
      let pixelZ = (leftZ + (rightZ - leftZ) / lineWidth * (j - leftX))

      if (isPointInsideTriangle(arr[0], arr[1], arr[2], point)) {
        // 根据j求当前z
        byZSetPixel(zBufferArr, i, j, pixelZ, ctx)
      }
    }

  }

}


let index = 0
const byZSetPixel = (zBufferArr, i, j, pixelZ, ctx) => {
  if (j < 0 || j >= 1000 || i < 0 || i >= 1000) {
    return; // 越界
  }

  // 只有小于深度缓存数组的像素才会被渲染
  if (zBufferArr[i][j] > pixelZ) {

    // pixelZ = 1 / pixelZ //
    index++
    let color = (pixelZ - 24.5) * 256 / 1.5    // 根据z值计算颜色,也就是生成深度图
    ctx.fillStyle = `rgb(${color},${color},${color})`
    ctx.fillRect(j, i - 200, 1, 1)
    zBufferArr[i][j] = pixelZ
  }
}

export { isPointInsideTriangle, computeArea, drawTriangleData };
