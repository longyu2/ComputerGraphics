// 转颜色
const colorToRGB = (color) => {
  // 处理六位的颜色值，转为RGB
  var colorChange = [];
  for (var i = 1; i < 7; i += 2) {
    colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
  }

  return colorChange;
};

export {
  colorToRGB
}