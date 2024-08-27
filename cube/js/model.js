// 采用左手系 摄像机原点为0坐标

// 调整世界坐标相对于摄像机的位移
let distanceZ = 76;

// 定义正方体模型数据，一共12个三角面
let cube = [
    // 底面
    [
      { x: -5, y: -5, z: -5 },
      { x: 5, y: -5, z: -5 },
      { x: 5, y: -5, z: 5 },
    ],
    [
      { x: -5, y: -5, z: -5 },
      { x: -5, y: -5, z: 5 },
      { x: 5, y: -5, z: 5 },
    ],
    // 右侧
    [
      { x: 5, y: -5, z: -5 },
      { x: 5, y: 5, z: -5 },
      { x: 5, y: 5, z: 5 },
    ],
    [
      { x: 5, y: -5, z: -5 },
      { x: 5, y: -5, z: 5 },
      { x: 5, y: 5, z: 5 },
    ],
    // 后侧
    [
      { x: 5, y: -5, z: 5 },
      { x: 5, y: 5, z: 5 },
      { x: -5, y: 5, z: 5 },
    ],
    // 后侧
    [
      { x: 5, y: -5, z: 5 },
      { x: -5, y: -5, z: 5 },
      { x: -5, y: 5, z: 5 },
    ],
    //左
  
    [
      { x: -5, y: 5, z: 5 },
      { x: -5, y: -5, z: 5 },
      { x: -5, y: -5, z: -5 },
    ],
    [
      { x: -5, y: 5, z: 5 },
      { x: -5, y: 5, z: -5 },
      { x: -5, y: -5, z: -5 },
    ],
  
    // 前
    [
      { x: -5, y: 5, z: -5 },
      { x: -5, y: -5, z: -5 },
      { x: 5, y: -5, z: -5 },
    ],
    [
      { x: -5, y: 5, z: -5 },
      { x: 5, y: 5, z: -5 },
      { x: 5, y: -5, z: -5 },
    ],
    // 上
    [
      { x: -5, y: 5, z: -5 },
      { x: 5, y: 5, z: -5 },
      { x: 5, y: 5, z: 5 },
    ],
    [
      { x: -5, y: 5, z: -5 },
      { x: -5, y: 5, z: 5 },
      { x: 5, y: 5, z: 5 },
    ],
  ];
  

for (let i = 0; i < cube.length; i++) {
    for (let j = 0; j < cube[i].length; j++) {
      cube[i][j].z += distanceZ;
    }
  }
  

  
  let cube2 = JSON.parse(JSON.stringify(cube))
  for (let i = 0; i < cube2.length; i++) {
    for (let j = 0; j < 3; j++) {
      cube2[i][j].x += 0
      cube2[i][j].y += 12
      cube2[i][j].z += 0
    }
  
  }
  
  let cube3 = JSON.parse(JSON.stringify(cube))
  for (let i = 0; i < cube3.length; i++) {
    for (let j = 0; j < 3; j++) {
      cube3[i][j].x += 0
      cube3[i][j].y -= 12
      cube3[i][j].z += 0
    }
  
  }
  
  
  let cube4 = JSON.parse(JSON.stringify(cube))
  for (let i = 0; i < cube4.length; i++) {
    for (let j = 0; j < 3; j++) {
      cube4[i][j].x += 12
      cube4[i][j].y += 12
      cube4[i][j].z -= 0
    }
  }
  
  
  
  let cube5 = JSON.parse(JSON.stringify(cube))
  for (let i = 0; i < cube.length; i++) {
    for (let j = 0; j < 3; j++) {
      cube5[i][j].x += 12
      cube5[i][j].y += 0
      cube5[i][j].z -= 0
    }
  
  }
  
  let cube6 = JSON.parse(JSON.stringify(cube))
  for (let i = 0; i < cube6.length; i++) {
    for (let j = 0; j < 3; j++) {
      cube6[i][j].x += 12
      cube6[i][j].y -= 12
      cube6[i][j].z -= 0
    }
  
  }
  
  
   let cube7 = JSON.parse(JSON.stringify(cube))
  for (let i = 0; i < cube7.length; i++) {
    for (let j = 0; j < 3; j++) {
      cube7[i][j].x -= 12
      cube7[i][j].y += 12
      cube7[i][j].z -= 0
    }
  
  }
  
  
  
  let cube8 = JSON.parse(JSON.stringify(cube))
  for (let i = 0; i < cube8.length; i++) {
    for (let j = 0; j < 3; j++) {
      cube8[i][j].x -= 12
      cube8[i][j].y -= 12
      cube8[i][j].z -= 0
    }
  
  }
  
  let cube9 = JSON.parse(JSON.stringify(cube))
  for (let i = 0; i < cube9.length; i++) {
    for (let j = 0; j < 3; j++) {
      cube9[i][j].x -= 12
      cube9[i][j].y += 0
      cube9[i][j].z -= 0
    }
  
  }
  



const moedels = [
cube,cube2,cube3,cube4,cube5,cube6,cube7,cube8,cube9
]


export {distanceZ,moedels}