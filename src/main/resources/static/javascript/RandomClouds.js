const cloudContainer = document.getElementById("cloud-container");

// Normalize a value based on the viewport width (window.innerWidth)
function normalizeValue(value, min, max) {
	const vw = window.innerWidth;
	return (value / 100) * (vw / (max - min)) + (min * vw) / (max - min);
}

// Example usage:
const minValue = 100; // Minimum value
const maxValue = 500; // Maximum value
const normalizedValue = normalizeValue(50, minValue, maxValue);

console.log(normalizedValue); // This will give you a value relative to the viewport width

function createAndAnimateCloud(isInitialSpawn) {
	const cloud = document.createElement("div");
	cloud.className = "cloud";

	const cloudImages = [
		'/images/cloudbackgroundforlogo.png',
	];

	const randomImageIndex = Math.floor(Math.random() * cloudImages.length);
	const randomImage = cloudImages[randomImageIndex];

	const zIndex = Math.floor(Math.random() * 9);

	cloud.style.backgroundImage = `url('${randomImage}')`;

	cloudContainer.appendChild(cloud);

	const size = Math.random() * 200 + 400;
	const speed = Math.random() * (1 - 0.75) + 0.75;
	const opacity = Math.random();
	let xPos, yPos;

	if (isInitialSpawn) {
		xPos = Math.random() * window.innerWidth - 200;
		yPos = Math.random() * window.innerHeight - 200;
	} else {
		xPos = Math.random() * (window.innerWidth + 350) - 200;
		yPos = window.innerHeight;
	}

	cloud.style.width = size + "px";
	cloud.style.height = size + "px";
	cloud.style.opacity = opacity;
	cloud.style.left = xPos + "px";
	cloud.style.top = yPos + "px";
	cloud.style.zIndex = zIndex;

	// Animation function
	function animate() {
		yPos -= speed;
		cloud.style.top = yPos + "px";

		if (yPos < -size) {
			cloud.remove();
			setTimeout(() => createAndAnimateCloud(false), Math.random() * 500 + 500);
		} else {
			requestAnimationFrame(animate);
		}
	}
	animate();
}

const Clouds_URLPathName = window.location.pathname;


//For specific pages we want to spawn different amounts of clouds.
if (Clouds_URLPathName === "/") {
	console.log("Homepage");
	for (let i = 0; i < Math.random() * 50 + 150; i++) {
		createAndAnimateCloud(true);
	}
} else {
	console.log("Other pages");
	for (let i = 0; i < Math.random() * (100 - 50) + 50; i++) {
		createAndAnimateCloud(true);
	}
}

