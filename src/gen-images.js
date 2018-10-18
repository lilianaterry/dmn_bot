var Canvas = require('canvas')
  , Image = Canvas.Image
  , canvas = new Canvas(2000, 2000)
  , ctx = canvas.getContext('2d');

var fs = require('fs');
var stream = canvas.pngStream();
var score1 = '25';
var score2 = '30';
var scoreText = score1 + "  -  " + score2;

ctx.font = '30px Impact';
var totalLen = ctx.measureText(scoreText);

var scoreX = 1000 - (totalLen / 2);
var scoreY = 100;

ctx.fillText(scoreText, scoreX, scoreY);
fs.writeFile('out.png', canvas.toBuffer());

/*
export default class GenImage {

	constructor(team1: string, team2: string, team1_score: string, team2_score: string) {
		this.team1 = team1;
		this.team2 = team2;
		this.team1_score = team1_score;
		this.team2_score = team2_score;
	}
	ctx.font = '300px Impact';
	ctx.fillText("Hello World", 500, 500);
	fs.writeFile('out.png', canvas.toBuffer());
}
 */
