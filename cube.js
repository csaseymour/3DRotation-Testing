var	c = document.getElementById("mycanvas"),
	ctx = c.getContext("2d"),
	width = c.width = window.innerWidth,
	height = c.height = window.innerHeight,
	cube = {
		vectors: [
			new vector(100,100,0),
			new vector(100,200,0),
			new vector(200,200,0),
			new vector(200,100,0),
			new vector(100,100,100),
			new vector(100,200,100),
			new vector(200,200,100),
			new vector(200,100,100)
		],
		lines: [
			new Array(2, 4, 5),
			new Array(1,6,3),
			new Array(2,7,4),
			new Array(1,8,3),
			new Array(1,8,6),
			new Array(2,7,5),
			new Array(6,3,8),
			new Array(4,5,7)
		]
	};

ctx.translate(width / 2, height / 2);
update();

function update(){
	ctx.clearRect(-width / 2, -height / 2, width, height);
	cube.vectors.forEach(function(v){
		/*v = rotateZ(v);
		v = rotateX(v);
		v = rotateY(v);*/
		ctx.beginPath();
		ctx.arc(v.x, v.y, 5, 0, Math.PI * 2, false);
		ctx.fill();
	});
	for (var i=0;i < cube.lines.length;i++) {
		for (var j=0; j < cube.lines[i].length; j++) {
			ctx.moveTo(cube.vectors[i].x, cube.vectors[i].y);
			ctx.lineTo(cube.vectors[cube.lines[i][j] - 1].x, cube.vectors[cube.lines[i][j] - 1].y);
			ctx.stroke();
		}
	}
	ctx.beginPath();
	ctx.arc(0, 0, 5, 0, Math.PI * 2, false);
	ctx.fill();
	requestAnimationFrame(update);
}

function vector(inx, iny, inz){
	this.x = inx;
	this.y = iny;
	this.z = inz;
};

function rotateX(delta, vec){
	var cos = Math.cos(delta),
		sin = Math.sin(delta);
	this.vec = vec;
	this.y = vec.y * cos - vec.z * sin;
	this.z = vec.z * cos + vec.y * sin;
	this.vec.y = this.y;
	this.vec.z = this.z;
	return this.vec;
}

function rotateY(delta, vec){
	var cos = Math.cos(delta),
		sin = Math.sin(delta);
	this.vec = vec;
	this.x = vec.x * cos - vec.z * sin;
	this.z = vec.z * cos + vec.x * sin;
	this.vec.x = this.x;
	this.vec.z = this.z;
	return this.vec;
}

function rotateZ(delta, vec){
	var cos = Math.cos(delta),
		sin = Math.sin(delta);
	this.vec = vec;
	this.x = vec.x * cos - vec.y * sin;
	this.y = vec.y * cos + vec.x * sin;
	this.vec.x = this.x;
	this.vec.y = this.y;
	return this.vec;
}

document.body.addEventListener("keydown", function(event){
	console.log(event.keyCode);
	switch(event.keyCode){
		case 37: //left
			console.log("left");
			cube.vectors.forEach(function(v){
				v = rotateZ(-0.1, v);
			});
			break;
		case 39: //right
			console.log("right");
			cube.vectors.forEach(function(v){
				v = rotateZ(0.1, v);
			});
			break;
		case 38: //up
			console.log("up");
			cube.vectors.forEach(function(v){
				v = rotateY(0.1, v);
			});
			break;
		case 40: //down
			console.log("down");
			cube.vectors.forEach(function(v){
				v = rotateY(-0.1, v);
			});
			break;
	}
});