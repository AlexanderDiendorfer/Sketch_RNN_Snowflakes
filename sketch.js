let model;
let strokePath = null;

let x, y;
let pen = 'down';

function setup() {
	createCanvas(800, 600);
	background(0);
	x = random(-width / 2, width / 2);
	y = random(-height / 2, height / 2);
	model = ml5.SketchRNN('snowflake', modelReady);
}

function modelReady() {
	console.log('model ready');
	model.reset();
	model.generate(gotSketch);
}

function draw() {
	translate(width / 2, height / 2);
	if (strokePath != null) {
		let newX = x + strokePath.dx * 0.1;
		let newY = y + strokePath.dy * 0.1;
		if (pen == 'down') {
			stroke(255);
			strokeWeight(1);
			line(x, y, newX, newY);
		}
		pen = strokePath.pen;
		strokePath = null;
		x = newX;
		y = newY;

		if (pen !== 'end') {
			model.generate(gotSketch);
		} else {
			console.log('drawing complete');
			model.reset();
			model.generate(gotSketch);
			x = random(-width / 2, width / 2);
			y = random(-height / 2, height / 2);
		}
	}
}

function gotSketch(error, s) {
	if (error) {
		console.error(error);
	} else {
		strokePath = s;
		// console.log(strokePath);
	}
}
