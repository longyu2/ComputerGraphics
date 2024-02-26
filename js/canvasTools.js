// canvas 画线
const drawLine = (a, b, ctx) => {
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.closePath();
    ctx.stroke();
    ctx.fill()
};

const drawTriangle = (a,b,c,ctx) =>{
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.lineTo(c.x, c.y);
    ctx.closePath();
    ctx.stroke();
    ctx.fill()
}
// 



export{
    drawLine,drawTriangle
}