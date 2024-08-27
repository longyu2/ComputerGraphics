import { xyToComputerXy, translate, compute, rotateX } from "./Tools.js";


const rotateImage =(ctx,du,offset,focalLength)=>{
    
  // 绘制一张图片
  let imZ = 360   // 图片距离
  let size = 100

  let imageData = []
  for (let i = -1 * size; i < size; i++) {
    let arr = []
    for (let j = -1 * size; j < size; j++) {
      arr.push([i, j, imZ])
    }
    imageData.push(arr)
  }

  let img = new Image();
  img.crossOrigin = "anonymous";
  img.src = "./1.jpg";
  ctx.drawImage(img, 0, 0)

  let ksdf=0

  // 进行旋转

  var da = ctx.createImageData(300, 300);

  for (let i = 0; i < da.data.length; i++) {
    da.data[4 * i] = 0
    da.data[4 * i + 1] = 0
    da.data[4 * i + 2] = 0
    da.data[4 * i + 3] = 0
  }




  for (let i = 0; i < size*2; i += 1) {
    for (let j = 0; j < size*2; j += 1) {

      let cubePoint = {}
      cubePoint.x = translate(imageData[i][j][0], imageData[i][j][2] - imZ, du).x - offset.x;
      cubePoint.z = translate(imageData[i][j][0], imageData[i][j][2] - imZ, du).y + imZ - offset.z; // 计算旋转坐标时先将中心移至原点，再移动回原坐标，则可绕自身旋转
      cubePoint.y = imageData[i][j][1] - offset.y
      imageData[i][j] = cubePoint

      let asas = compute(cubePoint.x, cubePoint.y, cubePoint.z, focalLength)
      let sss = xyToComputerXy(asas.x, asas.y, 15, 15, 15)

      let imgdat = ctx.getImageData(i, 300 - j, 1, 1)


      da.data[4 * (((sss.y + 100) * da.width + 100) + sss.x + 0)] = imgdat.data[0]
      da.data[4 * (((sss.y + 100) * da.width + 100) + sss.x) + 1] = imgdat.data[1]
      da.data[4 * (((sss.y + 100) * da.width + 100) + sss.x) + 2] = imgdat.data[2]
      da.data[4 * (((sss.y + 100) * da.width + 100) + sss.x) + 3] = imgdat.data[3]


      ksdf++
    }
  }



  
   
  ctx.putImageData(da, 500, 200)
}


export {rotateImage}