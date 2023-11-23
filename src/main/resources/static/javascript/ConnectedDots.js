var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var stars = [],
	FPS = 60,
	x = calculateNumStars(),
	mouse = {};

function calculateNumStars() {
	var numStars = Math.floor((canvas.width * canvas.height) / 25000);
	return numStars;
}

for (var i = 0; i < x; i++) {
	stars.push({
		x: Math.random() * canvas.width,
		y: Math.random() * canvas.height,
		radius: Math.random() * (canvas.width / 400) + 1,
		vx: Math.floor(Math.random() * 50) - 25,
		vy: Math.floor(Math.random() * 50) - 25
	});
}

function resizeCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	adjustStarPositions();
}

function adjustStarPositions() {
	for (var i = 0, x = stars.length; i < x; i++) {
		var s = stars[i];
		s.x = Math.random() * canvas.width;
		s.y = Math.random() * canvas.height;
	}
}

window.addEventListener('resize', function() {
	resizeCanvas();
	var newNumStars = calculateNumStars();

	if (newNumStars < stars.length) {
		stars.splice(newNumStars);
	} else {
		for (var i = stars.length; i < newNumStars; i++) {
			if (i < stars.length) {
				stars[i] = {
					x: Math.random() * canvas.width,
					y: Math.random() * canvas.height,
					radius: Math.random() * (canvas.width / 400) + 1,
					vx: Math.floor(Math.random() * 50) - 25,
					vy: Math.floor(Math.random() * 50) - 25
				};
			} else {
				stars.push({
					x: Math.random() * canvas.width,
					y: Math.random() * canvas.height,
					radius: Math.random() * (canvas.width / 400) + 1,
					vx: Math.floor(Math.random() * 50) - 25,
					vy: Math.floor(Math.random() * 50) - 25
				});
			}
		}
	}
});

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.globalCompositeOperation = "lighter";

	for (var i = 0, x = stars.length; i < x; i++) {
		var s = stars[i];
		ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
		ctx.shadowBlur = 20;
		ctx.shadowColor = "white";
		ctx.beginPath();
		ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
		ctx.fill();
		ctx.fillStyle = 'black';
		ctx.stroke();
		ctx.shadowBlur = 0;
	}

	ctx.beginPath();
	for (var i = 0, x = stars.length; i < x; i++) {
		var starI = stars[i];
		ctx.moveTo(starI.x, starI.y);
		if (distance(mouse, starI) < 150) ctx.lineTo(mouse.x, mouse.y);
		for (var j = 0, x = stars.length; j < x; j++) {
			var starII = stars[j];
			if (distance(starI, starII) < 150) {
				ctx.lineTo(starII.x, starII.y);
			}
		}
	}
	ctx.lineWidth = 0.05;
	ctx.strokeStyle = 'white';
	ctx.stroke();
}

function distance(point1, point2) {
	var xs = 0;
	var ys = 0;

	xs = point2.x - point1.x;
	xs = xs * xs;

	ys = point2.y - point1.y;
	ys = ys * ys;

	return Math.sqrt(xs + ys);
}

function update() {
	for (var i = 0, x = stars.length; i < x; i++) {
		var s = stars[i];
		s.x += s.vx / FPS;
		s.y += s.vy / FPS;
		if (s.x < 0 || s.x > canvas.width) s.vx = -s.vx;
		if (s.y < 0 || s.y > canvas.height) s.vy = -s.vy;
	}
}

function tick() {
	draw();
	update();
	requestAnimationFrame(tick);
}

tick();
