$(() => {
	let acc = $(".accordion");

	//For displaying the accordion style view links
	var i;
	for (i = 0; i < acc.length; i++) {
		acc[i].addEventListener("click", function() {
			var panel = this.nextElementSibling;
			if (panel.style.display === "block") {
				panel.style.display = "none";
			} else {
				panel.style.display = "block";
			}
		});
	}

	//For opening and closing the side bar
	let IsOpen = true;
	$("#OpenCloseBtn").click(() => {
		$(".SideBarLinkText, footer").toggle();
	});
});