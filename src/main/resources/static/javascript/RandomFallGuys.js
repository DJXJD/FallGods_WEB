const fallguysContainer = document.getElementById("fallguys-container");

function createAndAnimateFallGuy() {
	const FallGuy = document.createElement("div");
	FallGuy.className = "falling_fallguy";

	const FallGuysImages = [
		'/images/fallGuyTest.png',
		'/images/fallGuyTest2.png',
		'/images/fallGuyTest3.png',
		'/images/fallGuyTest4.png',
		'/images/fallGuyTest5.png',
	];

	const randomFallGuyImageIndex = Math.floor(Math.random() * FallGuysImages.length);
	const randomFallGuyImage = FallGuysImages[randomFallGuyImageIndex];

	const zIndex = Math.floor(Math.random() * 7);

	FallGuy.style.backgroundImage = `url('${randomFallGuyImage}')`;

	fallguysContainer.appendChild(FallGuy);

	const size = Math.random() * (200 - 100 + 1) + 100;
	const speed = Math.random() * (1.5 - 1) + 1;
	let xPos, yPos;

	xPos = Math.random() * ((window.innerWidth - size / 2) - size / 2) + size / 2;
	yPos = -200;

	FallGuy.style.width = size + "px";
	FallGuy.style.height = size + "px";
	FallGuy.style.left = xPos + "px";
	FallGuy.style.top = yPos + "px";
	FallGuy.style.zIndex = zIndex;

	function animate() {
		yPos += speed;
		FallGuy.style.top = yPos + "px";

		if (yPos > window.innerHeight + size) {
			FallGuy.remove();
			setTimeout(() => createAndAnimateFallGuy(), Math.floor(Math.random() * (2000 - 500 + 1)) + 500);
		} else {
			requestAnimationFrame(animate);
		}
	}
	animate();
}

const FallGuys_URLPathName = window.location.pathname;

console.log(FallGuys_URLPathName);
const pattern = /^\/view\/player\/\d+$/;

if(pattern.test(FallGuys_URLPathName)){
	console.log("The pattern is true");
}else{
switch(FallGuys_URLPathName){
	
	case "/":
		console.log("The homepage");
	break;
	
	case "/track":
		console.log("track page");
	break;
	
	case "/view":
		console.log("view page");
	break;
	
	case "/view/players":
		console.log("players page");
	break;
	
	case "/view/sessions":
		console.log("sessions page");
	break;
	
	case "/register":
		console.log("register page");
	break;
	
	case "/track/setGroup":
		console.log("Set group page");
	break;
	
	case pattern.test(FallGuys_URLPathName):
		console.log("Some player info page");
	break;
	
	default:
		console.log("This is an unknown page");
		break;
	}
}
//For specific pages we want to spawn different amounts of fall guys.
if (FallGuys_URLPathName === "/") {
	for (let i = 0; i < Math.random() * (9 - 1 + 1) + 1; i++) {
		createAndAnimateFallGuy();
	}
} else if(FallGuys_URLPathName === ''){
		for (let i = 0; i < Math.random() * (6 - 1 + 1) + 1; i++) {
		createAndAnimateFallGuy();
	}
}
