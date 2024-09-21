import { colorToRGB } from "./js/color.js";






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



/** 使用光栅绘制三角形 */
const drawTriangleData = (triangleArr, ctx,zBufferArr) => {
  computeTriangle(triangleArr, ctx,zBufferArr)



  // 绘制三角形前置准备

  const arr = [];
  arr.push(triangleArr[0].computerXy)
  arr.push(triangleArr[1].computerXy)
  arr.push(triangleArr[2].computerXy)


  let [maxX, maxY, minX, minY] = [arr[0].x, arr[0].y, arr[0].x, arr[0].y];

  // 计算出包含三角形的矩形区域
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

  let [width, height] = [maxX - minX, maxY - minY];

  if (width == 0 || height == 0) {
    return
  }

  let myImageData = ctx.getImageData(0, 0, 1000, 1000);  // get到整个画布数组




  // 逐个像素上色
  for (let y = 0; y <= height; y++) {
    for (let x = 0; x <= width; x++) {
      const point = { x: x + minX, y: y + minY };

      if (isPointInsideTriangle(arr[0], arr[1], arr[2], point)) {
        myImageData.data[(y + minY) * (1000 * 4) + (x + minX) * 4 + 0] = 255
        myImageData.data[(y + minY) * (1000 * 4) + (x + minX) * 4 + 1] = 128
        myImageData.data[(y + minY) * (1000 * 4) + (x + minX) * 4 + 2] = 128
        myImageData.data[(y + minY) * (1000 * 4) + (x + minX) * 4 + 3] = 255
      }
    }

  }


  ctx.putImageData(myImageData, 0, 0)
  var timestampEnd = Date.parse(new Date());

};


// 对三角形进行基本处理
const computeTriangle = (triangleArr, ctx, zBufferArr) => {
  let str = ""
  triangleArr.sort((a, b) => a.computerXy.y - b.computerXy.y)   // 根据对象属性的值进行排序，现在是按照y值进行排序

  const arr = [triangleArr[0].computerXy, triangleArr[1].computerXy, triangleArr[2].computerXy]


  let [maxX, maxY, minX, minY] = [arr[0].x, arr[0].y, arr[0].x, arr[0].y];

  // 计算出包含三角形的矩形区域
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

  let [width, height] = [maxX - minX, maxY - minY];

  // 确定顺序，也就是y值第二的点第一个的左和第二个点在右两种情况
  let dP1P2 = arr[1].x - arr[0].x / arr[1].y - arr[0].y

  let dP1P3 = arr[2].x - arr[0].x / arr[2].y - arr[0].y


  // 然后根据左右分别进行处理

  if (dP1P2 > dP1P3) {
    console.log("右");    // 这里屏幕坐标，所以右，平面直角应该是左，参考 https://www.kancloud.cn/digest/soft-3d-engine/130056

    // 上半部分
    for (let i = minY; i < triangleArr[1].computerXy.y; i++) {
      // 高为1，用1/(p3.y-p1.y)就是z的比值

      let leftZ = triangleArr[0].z + (triangleArr[2].z - triangleArr[0].z) * ((i - minY) / (triangleArr[2].computerXy.y - triangleArr[0].computerXy.y))
      let rightZ = triangleArr[0].z + (triangleArr[1].z - triangleArr[0].z) * ((i - minY) / (triangleArr[1].computerXy.y - triangleArr[0].computerXy.y))


      let leftX = triangleArr[0].computerXy.x + (triangleArr[2].computerXy.x - triangleArr[0].computerXy.x) * ((i - minY) / (triangleArr[2].computerXy.y - triangleArr[0].computerXy.y))

      let rightX = triangleArr[0].computerXy.x + (triangleArr[1].computerXy.x - triangleArr[0].computerXy.x) * (i - minY) / (triangleArr[1].computerXy.y - triangleArr[0].computerXy.y)

      let lineWidth = rightX - leftX



      // 左和右找到了，当前像素还得找
      for (let j = minX; j < maxX; j++) {
        const point = { x: j, y: i };

        if (isPointInsideTriangle(arr[0], arr[1], arr[2], point)) {

          // 根据j求当前z
          let pixelZ = (leftZ + (j - minX) / (lineWidth))

          str += `${pixelZ} `

          //  对比z-buffer，深度小于才渲染
          if (i < 1000 && j < 1000) {
            if (zBufferArr[i][j] > pixelZ ) {
              ctx.fillRect(j, i - 200, 1, 1)
              zBufferArr[i][j] = pixelZ
            }

          }


        }
      }
      str += "\n"

    }
    // 下半部分
    for (let i =  triangleArr[1].computerXy.y;  i<triangleArr[2].computerXy.y; i++) {
      // 下半也是求左右，求均值
      let leftZ = triangleArr[0].z + (triangleArr[2].z - triangleArr[0].z) * ((i - minY) / (triangleArr[2].computerXy.y - triangleArr[0].computerXy.y))
      let rightZ = triangleArr[1].z + (triangleArr[2].z - triangleArr[1].z) * ((i - triangleArr[1].computerXy.y) / (triangleArr[2].computerXy.y - triangleArr[1].computerXy.y))


      let leftX = triangleArr[0].computerXy.x + (triangleArr[2].computerXy.x - triangleArr[0].computerXy.x) * ((i - minY) / (triangleArr[2].computerXy.y - triangleArr[0].computerXy.y))

      let rightX = triangleArr[1].computerXy.x + (triangleArr[2].computerXy.x - triangleArr[1].computerXy.x) * (i - triangleArr[1].computerXy.y) / (triangleArr[2].computerXy.y - triangleArr[1].computerXy.y)

      let lineWidth = rightX - leftX

      for (let j = minX; j < maxX; j++) {
        const point = { x: j, y: i };

        if (isPointInsideTriangle(arr[0], arr[1], arr[2], point)) {

          // 根据j求当前z
          let pixelZ = (leftZ + (j - minX) / (lineWidth))

        
          str += `${pixelZ} `

          //  对比z-buffer，深度小于才渲染
          if (i < 1000 && j < 1000) {
            if (zBufferArr[i][j] > pixelZ) {
              ctx.fillRect(j, i - 200, 1, 1)
             
            }

          }


        }
      }
      str += "\n"

    }




  }
  else {
    console.log("左");
    console.log(ctx.fillStyle);
    // 上半部分
    for (let i = minY; i < triangleArr[1].computerXy.y; i++) {
      // 高为1，用1/(p3.y-p1.y)就是z的比值

      let leftZ = triangleArr[0].z + (triangleArr[1].z - triangleArr[0].z) * ((i - minY) / (triangleArr[1].computerXy.y - triangleArr[0].computerXy.y))
      let rightZ = triangleArr[0].z + (triangleArr[2].z - triangleArr[0].z) * ((i - minY) / (triangleArr[2].computerXy.y - triangleArr[0].computerXy.y))


      let leftX = triangleArr[0].computerXy.x + (triangleArr[1].computerXy.x - triangleArr[0].computerXy.x) * ((i - minY) / (triangleArr[1].computerXy.y - triangleArr[0].computerXy.y))
      let rightX = triangleArr[0].computerXy.x + (triangleArr[2].computerXy.x - triangleArr[0].computerXy.x) * (i - minY) / (triangleArr[2].computerXy.y - triangleArr[0].computerXy.y)

      let lineWidth = rightX - leftX



   
  
      for (let j = minX; j < maxX; j++) {

        const point = { x: j, y: i };
        if (isPointInsideTriangle(arr[0], arr[1], arr[2], point)) {

          // 根据j求当前z
          let pixelZ = (leftZ + (j - minX) / (lineWidth))
          str += `${pixelZ} `

          //  对比z-buffer，深度小于才渲染
          if (i < 1000 && j < 1000) {
            if (zBufferArr[i][j] > pixelZ ) {
              ctx.fillRect(j, i - 200, 1, 1)
              zBufferArr[i][j] = pixelZ
            }

          }


        }
      }
      str += "\n"

    }
    
    // 下半部分
    for (let i =  triangleArr[1].computerXy.y;  i<triangleArr[2].computerXy.y; i++) {
      // 下半也是求左右，求均值
      let leftZ = triangleArr[1].z + (triangleArr[2].z - triangleArr[1].z) * ((i -  triangleArr[1].computerXy.y) / (triangleArr[2].computerXy.y - triangleArr[1].computerXy.y))
      let rightZ = triangleArr[0].z + (triangleArr[2].z - triangleArr[0].z) * ((i - minY) / (triangleArr[2].computerXy.y - triangleArr[0].computerXy.y))

      let leftX = triangleArr[1].computerXy.x + (triangleArr[2].computerXy.x - triangleArr[1].computerXy.x) * ((i -triangleArr[1].computerXy.y) / (triangleArr[2].computerXy.y - triangleArr[1].computerXy.y))
      let rightX = triangleArr[0].computerXy.x + (triangleArr[2].computerXy.x - triangleArr[0].computerXy.x) * (i - minY) / (triangleArr[2].computerXy.y - triangleArr[0].computerXy.y)

      let lineWidth = rightX - leftX

      for (let j = minX; j < maxX; j++) {
        const point = { x: j, y: i };

        if (isPointInsideTriangle(arr[0], arr[1], arr[2], point)) {

          // 根据j求当前z
          let pixelZ = (leftZ + (j - minX) / (lineWidth))

          str += `${pixelZ} `

          //  对比z-buffer，深度小于才渲染
          if (i < 1000 && j < 1000) {
            if (zBufferArr[i][j] > pixelZ ) {
              ctx.fillRect(j, i - 200, 1, 1)
            }

          }


        }
      }
      str += "\n"

    }
  }


}
export { isPointInsideTriangle, computeArea, drawTriangleData };
