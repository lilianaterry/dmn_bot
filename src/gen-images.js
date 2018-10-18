import * as fs from 'fs';

const uuid = require('uuid/v4');
const Canvas = require('canvas');

export default class ImageGenerator {
  constructor(width: number, height: number) {
    this.canvas = new Canvas(width, height);
    this.ctx = this.canvas.getContext('2d');
  }

  write(directory: string): Promise {
    return new Promise((resolve, reject) => {
      const pngBuffer = this.canvas.toBuffer();
      const id = uuid();
      const writeStream = fs.createWriteStream(`${directory}/${id}.png`);
      writeStream.end(pngBuffer, () => {
        resolve(`${id}.png`);
      });

      writeStream.on('error', () => {
        reject(new Error('Something went wrong while writing the image.'));
      });
    });
  }

  genImage(): ImageGenerator {
    this.ctx.font = '300px Impact';
    this.ctx.fillText('Hello World', 500, 500);
    return this;
  }
}
