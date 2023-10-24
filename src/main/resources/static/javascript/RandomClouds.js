
const cloudContainer = document.getElementById("cloud-container");

function createAndAnimateCloud(isInitialSpawn) {
	const cloud = document.createElement("div");
	cloud.className = "cloud";

	// Generate a random cloud image
	const cloudImages = [
		'images/cloudbackgroundforlogo.png',
	];

	const randomImageIndex = Math.floor(Math.random() * cloudImages.length);
	const randomImage = cloudImages[randomImageIndex];

	cloud.style.backgroundImage = `url('${randomImage}')`;

	cloudContainer.appendChild(cloud);

	// Generate random properties
	const size = Math.random() * 200 + 400; // Random size between 300px and 500px
	const speed = Math.random() * 0.75 + 0.5; // Random speed between 2 and 7 pixels per frame
	const opacity = Math.random(); // Random opacity between 0 and 1
	let xPos, yPos;

	// If it's the initial spawn, position clouds randomly on the screen
	if (isInitialSpawn) {
		xPos = Math.random() * window.innerWidth - 200;
		yPos = Math.random() * window.innerHeight - 200;
	} else {
		// For subsequent spawns, start from the bottom
		xPos = Math.random() * (window.innerWidth + 350) - 200; // Random start position within the viewport
		yPos = window.innerHeight; // Start from the bottom of the screen
	}

	// Apply random properties to the cloud
	cloud.style.width = size + "px";
	cloud.style.height = size + "px";
	cloud.style.opacity = opacity;
	cloud.style.left = xPos + "px";
	cloud.style.top = yPos + "px";
	
	// Animation function
	function animate() {
		yPos -= speed;
		cloud.style.top = yPos + "px";

		// Remove the cloud element from the DOM when it's off-screen
		if (yPos < -size) {
			cloud.remove();
			// Schedule the next cloud creation and animation
			setTimeout(() => createAndAnimateCloud(false), Math.random() * 500 + 500); // Random delay between 0 and 5 seconds
		} else {
			requestAnimationFrame(animate);
		}
	}

	// Start the animation
	animate();
}

// Create and animate clouds initially spawned all over the screen
for (let i = 0; i < Math.random() * 50 + 150; i++) {
	createAndAnimateCloud(true);
}