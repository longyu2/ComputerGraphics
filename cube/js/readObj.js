const fs = require('fs')


let str = fs.readFileSync("./cube/js/bunny_10k.obj","utf-8")
let arr = str.split("\n")


let points = []
let trigngles = []

for (let i = 0; i < arr.length; i++) {
    if (arr[i][0]=="v") {
        let point = arr[i].split(" ")

        point.shift()
        point[0]=parseFloat(point[0])
        point[1]=parseFloat(point[1])
        point[2]=parseFloat(point[2])
        points.push(point)
    }
    
    if (arr[i][0]=="f") {

        let triangle =  arr[i].split(" ")
        triangle.shift()
        
        triangle[0] = parseInt(triangle[0].split("//")[0])
        triangle[1] = parseInt(triangle[1].split("//")[0])
        triangle[2] = parseInt(triangle[2].split("//")[0])
        trigngles.push(triangle)
    }


}

console.log(points.length);
console.log(trigngles);

fs.writeFileSync("points.json",JSON.stringify(points))
fs.writeFileSync("triangles.json",JSON.stringify(trigngles))