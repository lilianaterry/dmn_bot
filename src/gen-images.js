import uuid from 'uuid/v4';
import * as fs from 'fs';

const Canvas = require('canvas');

const { Image } = Canvas;

export default class ScorecardGenerator {
  canvas: Canvas;
  graphics: any;
  outputPath: string;

  constructor() {
    const width = 960;
    const height = 560;
    this.canvas = Canvas.createCanvas(width, height);
    this.graphics = this.canvas.getContext('2d');
    this.graphics.quality = 'best';
    this.graphics.antialias = 'subpixel';
    this.outputPath = `${__dirname}/${uuid()}.png`;
  }

  generate(
    finalScore: boolean,
    home: string,
    away: string,
    homeScore: string,
    awayScore: string,
    homeURI: string,
    awayURI: string,
    time: string,
    quarter: string,
    possession: 'home' | 'away',
  ) {
  // set background to white
    this.graphics.fillStyle = 'white';
    this.graphics.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this._drawBorders();
    this._topBar(finalScore, time, quarter);
    this._teamSection(home, away, homeScore, awayScore, homeURI, awayURI, 30, finalScore);

    if (!finalScore) {
      this._drawPossessionTriangle(possession);
    }

    fs.writeFileSync(this.outputPath, this.canvas.toBuffer());
    return this.outputPath;
  }

  cleanup() {
    fs.unlinkSync(this.outputPath);
  }

  _drawLine(startX: number, startY: number, endX: number, endY: number) {
    this.graphics.beginPath();
    this.graphics.strokeStyle = '#cbccce';
    this.graphics.lineWidth = 4;
    this.graphics.moveTo(startX, startY);
    this.graphics.lineTo(endX, endY);
    this.graphics.stroke();
    this.graphics.closePath();
  }

  _drawBorders() {
    const topBarHeight = 120;
    const { width } = this.canvas;
    this._drawLine(0, topBarHeight, width, topBarHeight); // bottom of header section
  }

  _topBar(finalScore: boolean, time: string, quarter: string) {
    const topPadding = 40;
    const sidePadding = 60;
    const fontSize = 40;

    this.graphics.fillStyle = '#6c6d6f';
    this.graphics.font = `${fontSize}pt arial`;
    const y = topPadding + fontSize;

    let text;
    let x;
    if (finalScore) {
      text = 'FINAL';
      x = sidePadding;
    } else {
      text = `${time} - ${quarter}`;
      x = this.canvas.width - this.graphics.measureText(text).width - sidePadding;
    }

    this.graphics.fillText(text, x, y);
  }

  _teamSection(
    home: string,
    away: string,
    homeScore: string,
    awayScore: string,
    homeURI: string,
    awayURI: string,
    padding: number,
    finalScore: boolean,
  ) {
    const nameSize = 40;
    const scoreSize = 60;

    const teamNameX = 220;
    const homeNameY = 210 + nameSize;
    const awayNameY = 430 + nameSize;

    let homeColor = '#48494a';
    let awayColor = '#48494a';

    // if this is the final score, grey one of the teams out
    if (finalScore) {
      const homeWins = parseInt(homeScore, 10) > parseInt(awayScore, 10);
      if (homeWins) {
        awayColor = '#a5a6a7';
      } else if (!homeWins && parseInt(homeScore, 10) !== parseInt(awayScore, 10)) {
        homeColor = '#a5a6a7';
      }
    }

    this.graphics.font = '60pt arial';
    const homeScoreLen = this.graphics.measureText(homeScore).width;
    const awayScoreLen = this.graphics.measureText(awayScore).width;
    const homeScoreX = this.canvas.width - homeScoreLen - padding;
    const awayScoreX = this.canvas.width - awayScoreLen - padding;
    const homeScoreY = 200 + scoreSize;
    const awayScoreY = 420 + scoreSize;

    // scores
    this.graphics.fillStyle = homeColor;
    this.graphics.fillText(homeScore, homeScoreX, homeScoreY);
    this.graphics.fillStyle = awayColor;
    this.graphics.fillText(awayScore, awayScoreX, awayScoreY);

    // names
    this.graphics.font = '40pt arial';
    this.graphics.fillStyle = homeColor;
    this.graphics.fillText(home, teamNameX, homeNameY);
    this.graphics.fillStyle = awayColor;
    this.graphics.fillText(away, teamNameX, awayNameY);

    // images
    const homeImg = new Image();
    homeImg.src = fs.readFileSync(homeURI);
    const awayImg = new Image();
    awayImg.src = fs.readFileSync(awayURI);

    this.graphics.drawImage(homeImg, padding, 180, 100, 100);
    this.graphics.drawImage(awayImg, padding, 400, 100, 100);
  }

  _drawPossessionTriangle(possession: 'home' | 'away') {
    const x = this.canvas.width - 20;
    const y = (possession !== 'home' ? 230 : 450);

    this.graphics.fillStyle = '#48494a';
    this.graphics.beginPath();
    this.graphics.moveTo(x, y);
    this.graphics.lineTo(x + 20, y - 24);
    this.graphics.lineTo(x + 20, y + 24);
    this.graphics.fill();
    this.graphics.closePath();
  }
}
