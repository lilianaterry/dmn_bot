var Canvas = require('canvas')
  , Image = Canvas.Image
  , canvas = Canvas.createCanvas(480, 280)
  , graphics = canvas.getContext('2d');
const fs = require('fs');

function drawBorders() {
	var topBarHeight = 60;
	var width = canvas.width;
	var height = canvas.height;
	
	// top
	drawLine(0, 1, width, 1);

	// left
	drawLine(1, 0, 1, height);

	// bottom
	drawLine(0, height - 1, width, height - 1);

	// right
	drawLine(width - 1, 0, width - 1, height);

	// bottom of header section 
	drawLine(0, topBarHeight, width, topBarHeight);
}

function drawLine(startX, startY, endX, endY) {
	graphics.beginPath();
	graphics.strokeStyle = "#cbccce";
	graphics.lineWidth = 2;
	graphics.moveTo(startX, startY);
	graphics.lineTo(endX, endY);
	graphics.stroke();
	graphics.closePath();
}

function topBar(finalScore, time, quarter) {
	var topPadding = 20;
	var sidePadding = 30;
	var fontSize = 20;

	graphics.fillStyle = "#6c6d6f";
	graphics.font = '20pt arial';
	var y = topPadding + fontSize;

	if (finalScore) {
		var text = "FINAL";
		var x = sidePadding;
		graphics.fillText(text, x, y);
	} else {
		var text = time + " - " + quarter;
		var x = canvas.width - graphics.measureText(text).width - sidePadding;
		graphics.fillText(text, x, y);
	}
}

function teamSection(team1, team2, team1Score, team2Score, team1URI, team2URI, padding, finalScore) {
	var nameSize = 20;
	var imgSize = 50;
	var scoreSize = 30;	

	var teamNameX = 110;
	var team1NameY = 105 + nameSize;
	var team2NameY = 215 + nameSize;
	
	var teamImgX = padding;
	var team1ImgY = 75 + imgSize;
	var team2ImgY = 185 + imgSize;

	var team1Color = "#48494a";
	var team2Color = "#48494a";

	// if this is the final score, grey one of the teams out 
	if (finalScore) {
		var team1Wins = parseInt(team1Score, 10) > parseInt(team2Score, 10);
		if (team1Wins) {
			team2Color = "#a5a6a7";
		} else if (!team1Wins && parseInt(team1Score, 10) != parseInt(team2Score, 10)) {
			team1Color = "#a5a6a7";
		}
	}

	graphics.font = '30pt arial';
	var team1ScoreLen = graphics.measureText(team1Score).width;
	var team2ScoreLen = graphics.measureText(team2Score).width;
	var team1ScoreX = canvas.width - team1ScoreLen - padding;
	var team2ScoreX = canvas.width - team2ScoreLen - padding;
	var team1ScoreY = 100 + scoreSize;
	var team2ScoreY = 210 + scoreSize; 

	// scores 
	graphics.fillStyle = team1Color;
	graphics.fillText(team1Score, team1ScoreX, team1ScoreY);	
	graphics.fillStyle = team2Color;
	graphics.fillText(team2Score, team2ScoreX, team2ScoreY);
	
	// names
	graphics.font = '20pt arial';
	graphics.fillStyle = team1Color;
	graphics.fillText(team1, teamNameX, team1NameY);
	graphics.fillStyle = team2Color;
	graphics.fillText(team2, teamNameX, team2NameY);

	// images
	var team1Img = new Image();
	team1Img.onload = () => {	
		graphics.drawImage(team1Img, padding, 90, 50, 50);
	}
	team1Img.src = team1URI;
	
	var team2Img = new Image();
	team2Img.onload = () => {
		graphics.drawImage(team2Img, padding, 200, 50, 50);
	}
	team2Img.src = team2URI;
}

function drawPossessionTriangle(possession, team1, team2) {
	var x = canvas.width - 10;
	var y;
	if (possession != team1) {
		y = 115; 
	} else {
		y = 225;
	}
	
	graphics.fillStyle = "#48494a";
	//graphics.strokeStyle = graphics.fillStyle;
	graphics.beginPath();
	graphics.moveTo(x, y);
	graphics.lineTo(x + 10, y - 12);
	graphics.lineTo(x + 10, y + 12);
	graphics.fill()
	graphics.closePath();

}

function generateCard(finalScore, 
											team1, 
											team2, 
											team1Score, 
											team2Score, 
											team1URI, 
											team2URI,
											time,
											quarter,
											possession) {

	// set background to white 
	graphics.fillStyle = "white";
	graphics.fillRect(0, 0, canvas.width, canvas.height);
	
	drawBorders();
	topBar(finalScore, time, quarter);
	teamSection(team1, team2, team1Score, team2Score, team1URI, team2URI, 30, finalScore); 
	
	if (!finalScore) {
		drawPossessionTriangle(possession, team1, team2);
	} 

	fs.writeFile('out.png', canvas.toBuffer());
}

generateCard(false, "Burges", "Lake Highlands", "40", "35", "BurgesHS_Logo.png", "LakeHighland.png", "10:58", "3rd", "Burges");

