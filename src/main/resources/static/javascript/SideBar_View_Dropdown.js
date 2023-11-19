$(() => {
	
	if ($(".ContainerForAll").hasClass("IsHidden")) {
		$(".ContainerForAll").removeClass("IsHidden");
			$(".SomeShit").remove();
	}	

	//Check to see if the accordion and sidebar should be collapsed or open on load.
	$(".ArrowRightView").hide();
	$(".ArrowDownView").hide();
	CheckSideBarStatus();
	CheckAccordionViewStatus();

	
SetCollapseExpandButtonValues();
	//Have to add this because it loads a 100ms to early lol, solve this in the future but this works.
	setTimeout(function() {
		//When button is pressed, we need to make sure we reset the button position
	SetCollapseExpandButtonValues();
	}, 100);


	//For displaying the accordion style view links
	$(".accordion").on("click", function() {
		if ($(".accordion").next().css("display") === "flex") {
			SetAccordionView("none");
		} else if ($(".accordion").next().css("display") === "none") {
			SetAccordionView("flex");
		}
	});
	
	
	function SetCollapseExpandButtonValues(){
		let RightArrowDefaultSizeX = 4.93;
		let RightArrowDefaultSizeY = 8;

		let RightButtonEmHeight = parseFloat(($(".SideBarArrowRight").css("height"))) / parseFloat(($(".SideBarArrowRight").css("font-size")));

		let RightButtonOffsetX = (RightButtonEmHeight * RightArrowDefaultSizeX);
		let RightButtonOffsetY = (RightButtonEmHeight * RightArrowDefaultSizeY);

		$(".ButtonAndContentWrapper").css("padding-left", ($(".SideBarContainer").width() - RightButtonOffsetX) + "px");
		$(".ButtonAndContentWrapper").css("padding-top", ($(".ButtonAndContentWrapper").css("padding-top") - RightButtonOffsetY) + "px");
	}

	//For opening and closing the side bar
	$(".OpenCloseBtn").click(() => {
		if (localStorage.getItem("SideBar") === "none") {
			SetSideBarView("flex");
		} else {
			SetSideBarView("none");
		}

		//When button is pressed, we need to make sure we reset the button position
		SetCollapseExpandButtonValues();
	});

	//Check the sidebar status to set to on load
	function CheckSideBarStatus() {
		console.log("Before : " + $(".SideBarContainer").width());
		if (localStorage.getItem("SideBar") === "flex") {
			SetSideBarView("flex");
			console.log("Executed this first");
		} else if (localStorage.getItem("SideBar") === "none") {
			SetSideBarView("none");
		}
		console.log("After : " + $(".SideBarContainer").width());
	}

	//Check the accordion view menu status to set to on load
	function CheckAccordionViewStatus() {
		if (localStorage.getItem("AccordionView") === "flex") {
			SetAccordionView("flex");
		} else if (localStorage.getItem("AccordionView") === "none") {
			SetAccordionView("none");
		}
	}

	//Set the accordion view properties for opening and closing.
	function SetAccordionView(displayType) {
		if (displayType === "none") {
			$(".ArrowRightView").show();
			$(".ArrowDownView").hide();
			localStorage.setItem("AccordionView", "none");
			$(".accordion").next().css("display", "none");
			$(".ViewInnerContainer").css("background-color", "");
			$(".ViewInnerContainer").css("border-radius", "0px");
		} else if (displayType === "flex") {
			$(".ArrowRightView").hide();
			$(".ArrowDownView").show();
			localStorage.setItem("AccordionView", "flex");
			if ($(".SideBarLinkText").css("display") === "none") {

				$(".ViewInnerContainer").css("background-color", "rgba(122,122,122,0.08)");
				$(".ViewInnerContainer").css("border-radius", "5px");
			} else {
				$(".ViewInnerContainer").css("background-color", "");
				$(".ViewInnerContainer").css("border-radius", "0px");
			}

			$(".accordion").next().css("display", "flex");
			$(".accordion").next().css("flex-direction", "column");
		}
	}

	//Set the sidebarview properties for opening and closing.
	function SetSideBarView(displayType) {
		if (displayType === "none") {
			$(".ViewArrowContainer").hide();
			localStorage.setItem("SideBar", "none");
			$(".SideBarLinkText, footer").hide();
			$(".ViewInnerContainer").css("background-color", "");
			$(".ViewInnerContainer").css("border-radius", "0px");
			$(".SideBarIcon").css("padding", "0px 5px 0px 5px");
			$(".panel").css("padding", "0px 0px 0px");
			if ($(".panel").css("display") === "flex") {
				$(".ViewInnerContainer").css("background-color", "rgba(122,122,122,0.08)");
				$(".ViewInnerContainer").css("border-radius", "5px");
			}
			$(".SideBarBottomArea").css("border-top", "1px solid #2e2e32");
		} else if (displayType === "flex") {
			$(".ViewArrowContainer").show();
			localStorage.setItem("SideBar", "flex");
			$(".SideBarLinkText, footer").show();
			if ($(".panel").css("display") === "flex") {
				$(".ViewInnerContainer").css("background-color", "");
				$(".ViewInnerContainer").css("border-radius", "");
			}
			$(".SideBarIcon").css("padding", "0px 5px 0px 5px");
			$(".panel").css("padding", "0px 0px 0px 30px");
			$(".SideBarBottomArea").css("border-top", "0px solid white");
		}
	}

	let currentPath = $(location).attr("pathname");
	//Whenever a link is clicked, this makes sure that it stays lit up, to know where in the navigation we are.
	$(".IconTextHContainer").each(function(index, element) {
		if ($(element).closest(".SideBarNavLinks").attr("href") === currentPath) {
			$(element).addClass("active-link");
			if ($(element).hasClass("AccordionLink")) {
				$("#ViewLink").addClass("active-link");
			}
		}
	});
});

