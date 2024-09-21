// 采用左手系 摄像机原点为0坐标

// 调整世界坐标相对于摄像机的位移
let distanceZ = 106;


// 采用顶点+顺序来表示可以更简单地表示3D模型
let points = [
  [-5, -5, -5],
  [5, -5, -5],
  [5, -5, 5],
  [-5, -5, 5],
  [-5, 5, -5],
  [5, 5, -5],
  [5, 5, 5],
  [-5, 5, 5],
]

let flat = [
  [0, 1, 2],
  [0, 3, 2],
  [4, 5, 6],
  [4, 7, 6],
  [1, 2, 6],
  [1, 2, 5],
  [0, 1, 5],
  [0, 1, 4],
  [2, 3, 6],
  [2, 3, 7],
  [0, 7, 4],
  [0, 7, 3]
]


let cube = []



for (let i = 0; i < flat.length; i++) {

  let arr = []

  for (let j = 0; j < flat[i].length; j++) {

    let obj = {}

    obj.x = points[flat[i][j]][0]
    obj.y = points[flat[i][j]][1]
    obj.z = points[flat[i][j]][2]

    arr.push(obj)
  }


  cube.push(arr)
}






// 定义正方体模型数据，一共12个三角面
// let cube = [
//     // 底面
//     [
//       { x: -5, y: -5, z: -5 },
//       { x: 5, y: -5, z: -5 },
//       { x: 5, y: -5, z: 5 },
//     ],
//     [
//       { x: -5, y: -5, z: -5 },
//       { x: -5, y: -5, z: 5 },
//       { x: 5, y: -5, z: 5 },
//     ],
//     // 右侧
//     [
//       { x: 5, y: -5, z: -5 },
//       { x: 5, y: 5, z: -5 },
//       { x: 5, y: 5, z: 5 },
//     ],
//     [
//       { x: 5, y: -5, z: -5 },
//       { x: 5, y: -5, z: 5 },
//       { x: 5, y: 5, z: 5 },
//     ],
//     // 后侧
//     [
//       { x: 5, y: -5, z: 5 },
//       { x: 5, y: 5, z: 5 },
//       { x: -5, y: 5, z: 5 },
//     ],
//     [
//       { x: 5, y: -5, z: 5 },
//       { x: -5, y: -5, z: 5 },
//       { x: -5, y: 5, z: 5 },
//     ],

//   //左

//   [
//     { x: -5, y: 5, z: 5 },
//     { x: -5, y: -5, z: 5 },
//     { x: -5, y: -5, z: -5 },
//   ],
//   [
//     { x: -5, y: 5, z: 5 },
//     { x: -5, y: 5, z: -5 },
//     { x: -5, y: -5, z: -5 },
//   ],

//   // // 前
//   [
//     { x: -5, y: 5, z: -5 },
//     { x: -5, y: -5, z: -5 },
//     { x: 5, y: -5, z: -5 },
//   ],
//   [
//     { x: -5, y: 5, z: -5 },
//     { x: 5, y: 5, z: -5 },
//     { x: 5, y: -5, z: -5 },
//   ],
//   // // 上
//   [
//     { x: -5, y: 5, z: -5 },
//     { x: 5, y: 5, z: -5 },
//     { x: 5, y: 5, z: 5 },
//   ],
//   [
//     { x: -5, y: 5, z: -5 },
//     { x: -5, y: 5, z: 5 },
//     { x: 5, y: 5, z: 5 },
//   ],

//   ];


for (let i = 0; i < cube.length; i++) {
  for (let j = 0; j < cube[i].length; j++) {
    cube[i][j].z += distanceZ;
  }
}



// let cube2 = JSON.parse(JSON.stringify(cube))
// for (let i = 0; i < cube2.length; i++) {
//   for (let j = 0; j < 3; j++) {
//     cube2[i][j].x += 0
//     cube2[i][j].y += 12
//     cube2[i][j].z += 0
//   }

// }

// let cube3 = JSON.parse(JSON.stringify(cube))
// for (let i = 0; i < cube3.length; i++) {
//   for (let j = 0; j < 3; j++) {
//     cube3[i][j].x += 0
//     cube3[i][j].y -= 12
//     cube3[i][j].z += 0
//   }

// }


// let cube4 = JSON.parse(JSON.stringify(cube))
// for (let i = 0; i < cube4.length; i++) {
//   for (let j = 0; j < 3; j++) {
//     cube4[i][j].x += 12
//     cube4[i][j].y += 12
//     cube4[i][j].z -= 0
//   }
// }



// let cube5 = JSON.parse(JSON.stringify(cube))
// for (let i = 0; i < cube.length; i++) {
//   for (let j = 0; j < 3; j++) {
//     cube5[i][j].x += 12
//     cube5[i][j].y += 0
//     cube5[i][j].z -= 0
//   }

// }

// let cube6 = JSON.parse(JSON.stringify(cube))
// for (let i = 0; i < cube6.length; i++) {
//   for (let j = 0; j < 3; j++) {
//     cube6[i][j].x += 12
//     cube6[i][j].y -= 12
//     cube6[i][j].z -= 0
//   }

// }


//  let cube7 = JSON.parse(JSON.stringify(cube))
// for (let i = 0; i < cube7.length; i++) {
//   for (let j = 0; j < 3; j++) {
//     cube7[i][j].x -= 12
//     cube7[i][j].y += 12
//     cube7[i][j].z -= 0
//   }

// }



// let cube8 = JSON.parse(JSON.stringify(cube))
// for (let i = 0; i < cube8.length; i++) {
//   for (let j = 0; j < 3; j++) {
//     cube8[i][j].x -= 12
//     cube8[i][j].y -= 12
//     cube8[i][j].z -= 0
//   }

// }

// let cube9 = JSON.parse(JSON.stringify(cube))
// for (let i = 0; i < cube9.length; i++) {
//   for (let j = 0; j < 3; j++) {
//     cube9[i][j].x -= 12
//     cube9[i][j].y += 0
//     cube9[i][j].z -= 0
//   }

// }




// let moedels = [
// cube,cube2,cube3,cube4,cube5,cube6,cube7,cube8,cube9
// ]
let moedels = []


let jinZita = [
  [
    { x: -10, y: -10, z: distanceZ - 0 },
    { x: 5, y: -30, z: distanceZ - 10 },
    { x: -10, y: -10, z: distanceZ + 40 },
  ],
  [
    { x: -10 + 5, y: -10, z: distanceZ - 10 },
    { x: 5 + 5, y: -30, z: distanceZ - 10 },
    { x: -10 + 5, y: -10, z: distanceZ + 40 },
  ],

  [
    { x: -10 + 8, y: -10, z: distanceZ - 10 },
    { x: 5 + 8, y: -30, z: distanceZ - 10 },
    { x: -10 + 8, y: -10, z: distanceZ + 40 },
  ],
  [
    { x: -10, y: -12, z: distanceZ - 20 },
    { x: 5, y: -8, z: distanceZ - 20 },
    { x: -10, y: -10, z: distanceZ + 20 },
  ],

  [
    { x: -10, y: -17, z: distanceZ - 22 },
    { x: 5, y: -15, z: distanceZ - 22 },
    { x: -10, y: -17, z: distanceZ + 22 },
  ],


  // [
  //   {x:-10,y:-10,z:distanceZ-10},
  //   {x:10,y:-10,z:distanceZ-10},
  //   {x:-10,y:-10,z:distanceZ+10},
  // ],
  // [
  //   {x:10,y:-10,z:distanceZ-10},
  //   {x:-10,y:-10,z:distanceZ+10},
  //   {x:10,y:-10,z:distanceZ+10},
  // ],

  // [
  //   {x:-10,y:-10,z:distanceZ-10},
  //   {x:10,y:-10,z:distanceZ-10},
  //   {x:0,y:25,z:distanceZ}
  // ],
  // [
  //   {x:-10,y:-10,z:distanceZ-10},
  //   {x:-10,y:-10,z:distanceZ+10},
  //   {x:0,y:25,z:distanceZ}
  // ]
  // ,
  // [
  //   {x:10,y:-10,z:distanceZ-10},
  //   {x:10,y:-10,z:distanceZ+10},
  //   {x:0,y:25,z:distanceZ}
  // ]
  // ,[
  //   {x:-10,y:-10,z:distanceZ+10},
  //   {x:10,y:-10,z:distanceZ+10},
  //   {x:0,y:25,z:distanceZ}
  // ]
]

// moedels = [jinZita]
moedels = [cube]




export { distanceZ, moedels }
