import { xyToComputerXy, translate } from "./Tools.js";
import { drawLine } from "./canvasTools.js";

// 定义canvas
var canvas = document.getElementById("tutorial");
var ctx = canvas.getContext("2d");
ctx.fillpath = "rgba(0, 0, 0, 0.5)";
let distance = 5; // 摄像机到视平面的距离

// 采用左手系 摄像机原点为0坐标

// 定义正方体初始坐标
let cube = [
    { x: -5, y: -5, z: 10 },
    { x: 5, y: -5, z: 10 },
    { x: 5, y: -5, z: 20 },
    { x: -5, y: -5, z: 20 },

    { x: -5, y: 5, z: 10 },
    { x: 5, y: 5, z: 10 },
    { x: 5, y: 5, z: 20 },
    { x: -5, y: 5, z: 20 },
];

// 计算摄像机投影
function compute(x, y, z, j) {
    let x1 = 0;
    let y1 = 0;

    if (j > z) {
        console.error("j必须小于z");
    }
    x1 = (j * x) / z;
    y1 = (j * y) / z;

    return { x: x1, y: y1 };
}

let lifangti3d;
// 帧绘画函数
function draw() {
    ctx.clearRect(0, 0, 10000, 10000);
    let cubeProjection = [];
    for (let i = 0; i < cube.length; i++) {
        const element = cube[i];
        let cubePoint = {}; // 旋转后的正方体顶点坐标
        cubePoint.x = translate(element.x, element.z - 15, du).x;

        // 计算旋转坐标时先将中心移至原点，再移动回原坐标，则可绕自身旋转
        cubePoint.z = translate(element.x, element.z - 15, du).y + 15;
        cubePoint.y = element.y;

        // 绕y轴
        // const yy = translate(cubePoint.y , cubePoint.z - 15, du).x
        // cubePoint.z = translate(cubePoint.y , cubePoint.z - 15, du).y + 15
        // cubePoint.y = yy

        // 未进行坐标转换，此时还是平面直角坐标
        const pointXy = compute(cubePoint.x, cubePoint.y, cubePoint.z, distance);
        // 进行转换
        cubeProjection.push(xyToComputerXy(pointXy.x, pointXy.y, 7, 7, 71.4285));
    }



    // 绘制4条底边
    ctx.strokeStyle = "red";
    drawLine(cubeProjection[0], cubeProjection[1], ctx);
    drawLine(cubeProjection[1], cubeProjection[2], ctx);
    drawLine(cubeProjection[2], cubeProjection[3], ctx);
    drawLine(cubeProjection[0], cubeProjection[3], ctx);

    // 斜线
    ctx.strokeStyle = "red";
    drawLine(cubeProjection[0], cubeProjection[2], ctx); // 底面斜线

    ctx.strokeStyle = "blue";
    drawLine(cubeProjection[1], cubeProjection[6], ctx);
    drawLine(cubeProjection[3], cubeProjection[4], ctx);
    drawLine(cubeProjection[2], cubeProjection[7], ctx);
    drawLine(cubeProjection[0], cubeProjection[5], ctx);

    ctx.strokeStyle = "green";
    drawLine(cubeProjection[5], cubeProjection[7], ctx); // 顶面斜线

    // 绘制4顶边
    ctx.strokeStyle = "green";
    drawLine(cubeProjection[4], cubeProjection[5], ctx);
    drawLine(cubeProjection[5], cubeProjection[6], ctx);
    drawLine(cubeProjection[6], cubeProjection[7], ctx);
    drawLine(cubeProjection[4], cubeProjection[7], ctx);

    // 绘制4条柱子
    ctx.strokeStyle = "blue";
    drawLine(cubeProjection[0], cubeProjection[4], ctx);
    drawLine(cubeProjection[1], cubeProjection[5], ctx);
    drawLine(cubeProjection[2], cubeProjection[6], ctx);
    drawLine(cubeProjection[3], cubeProjection[7], ctx);
}

// 控制单tick之间变化速度
let ppp = (2 * Math.PI) / 360 / 2;
let index = 0;
let du = 2 * Math.PI;

draw();

// setInterval(() => {
//     if (du < 0) {
//         du = 2 * Math.PI
//     }
//     else {
//         du -= ppp
//     }
//     draw()
// }, 16.6)


// 定义一个监控鼠标的类
// class mouse {
//     x
//     y
//     isDown
//     prevX
//     constructor() {
//         this.x = 0
//         this.y = 0
//         this.isDown = false
//         this.prevX = 0
//     }
// }

// 记录鼠标坐标
const mouse = {
    x: 0,
    y: 0,
    isDown: false,
    prevX: 0
};

// 鼠标控制旋转, 目前只实现了x坐标旋转
canvas.onmousedown = (e) => {
    mouse.isDown = true;
};

canvas.onmousemove = (e) => {
    if (mouse.isDown) {
        const changeX = mouse.prevX === 0 ? 0 : e.clientX - mouse.prevX     // 检测鼠标x移动了多少,三元，当prevX  = 0 时需要额外处理
        // console.log(`changeX:${changeX}`)
        mouse.prevX = e.clientX
        du -= ((2 * Math.PI) / 360) * 0.28 * changeX // 根据改变量绘图
        if (du < 0) {
            du = 2 * Math.PI
        }
        draw()
    }
};


canvas.onmouseup = (e) => {
    console.log(e.clientX);
    console.log(2);
    mouse.isDown = false;
    mouse.prevX = 0
};
