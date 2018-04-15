let playerLeft = {};
let playerRight = {};
let ball = {};
let gameLoop = undefined;

const playerWidth = 10;
const playerHeight = 70;
const width = 600;
const height = 300;
const fps = 1;

const keyCodes = {
    left: 37,
    up: 38,
    right: 39,
    down: 40,

    d: 100,
    w: 119,
    a: 97,
    s: 115
}

const initPlayers = function(context){
    playerLeft = {
	x: 20,
	y: 50,
	height: playerHeight,
	width: playerWidth,
	score: 0,

	draw: function(){
	    context.fillRect(this.x, this.y, this.width, this.height);
	},
	isCollide: function(object){
	    if (object.y + object.height < this.y || object.y > this.y + this.height) {
		return false
	    }

	    if (object.x + object.width < this.x || object.x > this.x + this.width) {
		return false;
	    }

	    return true;
	}
    }

    playerRight = {
	x: width - 20,
	y: 50,
	height: playerHeight,
	width: playerWidth,
	score: 0,

	draw: function(){
	    context.fillRect(this.x, this.y, this.width, this.height);
	},
	isCollide: function(object){
	    if (object.y + object.height < this.y || object.y > this.y + this.height) {
		return false
	    }

	    if (object.x + object.width < this.x || object.x > this.x + this.width) {
		return false;
	    }

	    return true;
	}
    }
}

const initBall = function(context){
    ball = {
	x: 290,
	y: 140,
	deltaX: 1,
	deltaY: 1,
	height: 20,
	width: 20,

	draw: function(){
	    context.fillRect(this.x, this.y, this.width, this.height);
	},
	update: function(){
	    this.x += this.deltaX;
	    this.y += this.deltaY;
	},
	hasTouchedVertical: function(){
	    if (0 === this.y) {
		return true;
	    }

	    if (height === this.y + this.height) {
		return true;
	    }

	    return false;
	},
	hasTouchedLeft: function(){
	    if (0 < this.x) {
		return false;
	    }

	    return true;
	},
	hasTouchedRight: function(){
	    if (this.x + this.width < width) {
		return false;
	    }

	    return true;
	}
    }
}

const move = function(e){
    let keyCode = e.keyCode === 0 ? e.charCode : e.keyCode
    if (keyCodes.up === keyCode) {
	playerRight.y -= 15;
	return;
    }

    if (keyCodes.down === keyCode) {
	playerRight.y += 15;
	return;
    }
    
    if (keyCodes.w === keyCode) {
	playerLeft.y -= 15;
	return;
    }

    if (keyCodes.s === keyCode) {
	playerLeft.y += 15;
	return;
    }
}

const runGame = function(context){
    if (playerRight.isCollide(ball)) {
	ball.deltaX *= -1;
    }

    if (playerLeft.isCollide(ball)) {
	ball.deltaX *= -1;
    }

    if (ball.hasTouchedVertical(context)) {
	ball.deltaY *= -1;
    }

    if (ball.hasTouchedLeft()) {
	playerRight.score += 1;
	document.getElementById('playerRight').innerHTML = playerRight.score;
	initBall(context);
    }

    if (ball.hasTouchedRight(context)) {
	playerLeft.score += 1;
	document.getElementById('playerLeft').innerHTML = playerLeft.score;
	initBall(context);
    }

    ball.update();
    
    // redraw field
    context.clearRect(0, 0, 600, 300);
    playerLeft.draw();
    playerRight.draw();
    ball.draw();
}

const initGame = function(){
    let canvas = document.getElementById('canvas');
    if (!canvas.getContext) {
	alert('Your Browser does not support canvas');
	return;
    }

    window.onkeypress = move;
    let context = canvas.getContext('2d');
    initPlayers(context);
    initBall(context);

    document.getElementById('playerLeft').innerHTML = playerLeft.score;
    document.getElementById('playerRight').innerHTML = playerRight.score;
    
    // game loop
    gameLoop = setInterval(runGame, fps, context);
}
