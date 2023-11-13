
// 坐标系旋转
const translate = (x, y, n) => {
    const x1 = x * Math.cos(n) + Math.sin(n) * y;
    const y1 = y * Math.cos(n) - Math.sin(n) * x;
    return { x: x1, y: y1 };
}

// 从平面直角坐标系转化为屏幕坐标系
const xyToComputerXy =  (x, y, W, H, multiple = 1) => {
    let x1 = parseInt((W / 2 + x));
    let y1 = parseInt((H / 2 - y));
    return { x: x1 * 1, y: y1 * 1 }
}


// canvas 画线
const drawLine= (a,b,ctx) =>{
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.closePath();
    ctx.stroke();
    ctx.fill()
};


export {translate,xyToComputerXy,drawLine}