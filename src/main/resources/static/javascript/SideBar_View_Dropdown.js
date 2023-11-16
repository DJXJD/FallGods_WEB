$(() => {
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
		} else {
			$(".ViewInnerContainer").css("background-color", "");
			$(".ViewInnerContainer").css("border-radius", "0px");
			$(".SideBarIcon").css("padding", "0px 0px 0px 5px");
			$(".panel").css("padding", "0px 0px 0px 30px");
		}
	});
});