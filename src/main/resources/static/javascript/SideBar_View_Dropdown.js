$(() => {
	
	//Do this first time irregardless of click at least once.
	let offset = -202.703;
		console.log("Total offset: " + ($(".SideBarContainer").outerWidth() + offset) + "px");	
		
		$(".ButtonAndContentWrapper").css("left", ($(".SideBarContainer").outerWidth() + offset) + "px");
		
	
	//For displaying the accordion style view links
	let i;
	for (i = 0; i < $(".accordion").length; i++) {
		$(".accordion")[i].addEventListener("click", function() {
			if (this.nextElementSibling.style.display === "flex") {
				this.nextElementSibling.style.display = "none";
				$(".ViewInnerContainer").css("background-color", "");
				$(".ViewInnerContainer").css("border-radius", "0px");
			} else {
				if ($(".SideBarLinkText").css("display") === "none") {
					$(".ViewInnerContainer").css("background-color", "gray");
					$(".ViewInnerContainer").css("border-radius", "5px");
				} else {
					$(".ViewInnerContainer").css("background-color", "");
					$(".ViewInnerContainer").css("border-radius", "0px");
				}
				this.nextElementSibling.style.display = "flex";
				this.nextElementSibling.style.flexDirection = "column";
			}
		});
	}

	//For opening and closing the side bar
	$("#OpenCloseBtn").click(() => {
		$(".SideBarLinkText, footer").toggle();
		
		console.log($(".SideBarContainer").outerWidth());	
		
		let offset = -202.703;
		console.log("Total offset: " + ($(".SideBarContainer").outerWidth() + offset) + "px");	
		
		$(".ButtonAndContentWrapper").css("left", ($(".SideBarContainer").outerWidth() + offset) + "px");
		
		if ($(".SideBarLinkText").css("display") === "none") {
			if ($(".panel").css("display") === "flex") {
				$(".ViewInnerContainer").css("background-color", "gray");
				$(".ViewInnerContainer").css("border-radius", "5px");
			} else {
				$(".ViewInnerContainer").css("background-color", "");
				$(".ViewInnerContainer").css("border-radius", "0px");
			}
			$(".SideBarIcon").css("padding", "0px 5px 0px");
			$(".panel").css("padding", "0px 0px 0px");
			$(".SideBarBottomArea").css("border-top", "0px solid white");
		} else {
			$(".ViewInnerContainer").css("background-color", "");
			$(".ViewInnerContainer").css("border-radius", "0px");
			$(".SideBarIcon").css("padding", "0px 0px 0px 5px");
			$(".panel").css("padding", "0px 0px 0px 30px");
			$(".SideBarBottomArea").css("border-top", "1px solid #2e2e32");
		}
	});
});

	
