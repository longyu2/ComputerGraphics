import { vertices, flat } from "./js_models/cube.js"

// 采用左手系 摄像机原点为0坐标
// 调整世界坐标相对于摄像机的位移
let distanceZ = 105;
let model = []
let mut = 5 // 放大倍数

for (let i = 0; i < flat.length; i++) {

  let arr = []

  for (let j = 0; j < flat[i].length; j++) {
    let obj
    try {
      obj = {
        x: vertices[flat[i][j] - 1][0] * mut,
        y: vertices[flat[i][j] - 1][1] * mut,
        z: vertices[flat[i][j] - 1][2] * mut
      }
    }
    catch {



    }


    arr.push(obj)
  }

  model.push(arr)
}





for (let i = 0; i < model.length; i++) {
  for (let j = 0; j < model[i].length; j++) {
    model[i][j].z += distanceZ;
  }
}




let moedels = []

moedels = [model]


export { distanceZ, moedels }
