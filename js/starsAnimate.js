import { translate, xyToComputerXy, drawLine } from "./Tools.js"

// 定义init主函数
const animatePlay = (value) => {
    // 根据下拉框值选择不同模式
    if (value === '1') {
        size = 300
        jiao = 60

    }
    else if (value === '2') {
        size = 300
        jiao = 60
    }
    else if (value === '3') {
        size = 300
        jiao = 10
    }
    else if (value === '4') {
        size = 300
        jiao = 10
    }
    else if (value === '5') {
        size = 2700
        jiao = 20
    }


    const timeSetInterval = setInterval(() => {
        ctx.clearRect(0, 0, 1000, 1000);

        // 定义初始点坐标
        let point = { x: 0, y: size }
        let prevPoint = { x: 0, y: 0 }

        for (let i = 0; i < (360 / jiao) * 2; i++) {
            prevPoint = point
            point = translate(point.x, point.y, (Math.PI - (Math.PI / 360 * jiao)))
            let [x1, y1] = [point.x, point.y]
            let B1 = { x: xyToComputerXy(prevPoint.x, prevPoint.y, 1000, 1000,1).x, y: xyToComputerXy(prevPoint.x, prevPoint.y, 1000, 1000, 1).y }
            let B2 = { x: xyToComputerXy(x1, y1, 1000, 1000, 1).x, y: xyToComputerXy(x1, y1, 1000, 1000, 1).y }

            drawLine(B1, B2, ctx)
            ctx.strokeStyle = "#cccccc";
        }

        // 根据不同模式来进行渲染变化
        if (value === '1') {
            // 增大小,增角的数量
            if (jiao > 10) {
                jiao -= 0.07
                size += 13
            }
            else {
                clearInterval(timeSetInterval)
            }
        }
        else if (value === '2') {
            // 不增大小,增角的数量
            if (jiao > 20) {
                jiao -= 0.1
            }
            else {
                clearInterval(timeSetInterval)
            }
        }
        else if (value === '3') {
            // 不增大小,减小角的数量
            if (jiao < 60) {
                jiao += 0.1
            }
            else {
                clearInterval(timeSetInterval)
            }
        }
        else if (value === '4') {
            // 增大小,角的数量不变
            if (size * Math.tan(2 * Math.PI / 360 * jiao / 2) < 800) {
                size += 15
            }
            else {
                clearInterval(timeSetInterval)
            }
        }

        else if (value === '5') {
            // 减少大小,角的数量减少
            if (size * Math.tan(2 * Math.PI / 360 * jiao / 2) > 80 && jiao < 60) {
                size -= 10
                jiao += 0.1
            }
            else {
                clearInterval(timeSetInterval)
            }
        }
    }, 1000 / 60)

    // 启动一个新的timeOut,若无干预，6秒自动重新播放
    clearInterval(TimeOut)
    TimeOut = setInterval(() => {
        animatePlay((Math.floor(Math.random() * 4 + 1).toString()))
    }, 6000)
}

var canvas = document.getElementById("tutorial");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "rgba(255, 0, 0, 1)";



const sel = document.getElementById("sel")
sel.onchange = () => {
    animatePlay(sel.value)
}

let TimeOut
let size = 300
let jiao = 60
animatePlay((Math.floor(Math.random() * 4 + 1).toString()))
// 

// let jiao = 2     等于2时会画出有意思的沙漏,真相原来是for循环不够，所以只画成沙漏
// 角度，角度越小，星星的角越多


