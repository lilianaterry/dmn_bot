var Canvas = require('canvas')
  , Image = Canvas.Image
  , canvas = new Canvas(2000, 2000)
  , ctx = canvas.getContext('2d');

var fs = require('fs');
var stream = canvas.pngStream();
 
ctx.font = '300px Impact';
ctx.fillText("Hello World", 500, 500);
 
fs.writeFile('out.png', canvas.toBuffer());
