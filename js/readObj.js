const { log } = require('console')
const fs = require('fs')


let str = fs.readFileSync("models/Sting-Sword-lowpoly.obj", "utf-8")
let arr = str.split("\n")


let points = []
let trigngles = []

for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] == "v" && arr[i][1] == " ") 
        {
            let point = arr[i].split(" ")

            point.shift()
            point[0] = parseFloat(point[0])
            point[1] = parseFloat(point[1])
            point[2] = parseFloat(point[2])
            points.push(point)
        }


        if (arr[i][0] == "f") {

            let triangle = arr[i].split(" ")
            triangle.shift()

            triangle[0] = parseInt(triangle[0].split("//")[0])
            triangle[1] = parseInt(triangle[1].split("//")[0])
            triangle[2] = parseInt(triangle[2].split("//")[0])
            trigngles.push(triangle)
        }



    

}

let str2 = ""

str2 += "let vertices = [\n"
for (let i = 0; i < points.length; i++) {
    str2 += `  [${points[i][0]}, ${points[i][1]}, ${points[i][2]}],\n`
}
str2 += "];\n\n"
str2 += "let flat = [\n"
for (let i = 0; i < trigngles.length; i++) {
    str2 += `  [${trigngles[i][0]}, ${trigngles[i][1]}, ${trigngles[i][2]}],\n`
}
str2 += "];\n\n"
str2 += "export { vertices, flat };\n"

fs.writeFileSync("js/sward.js", str2)