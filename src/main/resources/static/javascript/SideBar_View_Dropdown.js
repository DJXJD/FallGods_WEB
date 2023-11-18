$(() => {
	//Check to see if the accordion and sidebar should be collapsed or open on load.
	CheckSideBarStatus();
	CheckAccordionViewStatus();

	//For displaying the accordion style view links
	$(".accordion").on("click", function() {
		if ($(".accordion").next().css("display") === "flex") {
			SetAccordionView("none");
		} else if ($(".accordion").next().css("display") === "none") {
			SetAccordionView("flex");
		}
	});

	//For opening and closing the side bar
	$("#OpenCloseBtn").click(() => {
		if (localStorage.getItem("SideBar") === "none") {
			SetSideBarView("flex");
		} else {
			SetSideBarView("none");
		}
	});

	//Check the sidebar status to set to on load
	function CheckSideBarStatus() {
		if (localStorage.getItem("SideBar") === "flex") {
			SetSideBarView("flex");
		} else if (localStorage.getItem("SideBar") === "none") {
			SetSideBarView("none");
		}
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
			$(".SideBarIcon").css("padding", "0px 5px 0px");
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
			$(".SideBarIcon").css("padding", "0px 0px 0px 0px");
			$(".panel").css("padding", "0px 0px 0px 30px");
			$(".SideBarBottomArea").css("border-top", "0px solid white");
		}

		//When button is pressed, we need to make sure we reset the button position
		let offset = -202.703;
		$(".ButtonAndContentWrapper").css("left", ($(".SideBarContainer").outerWidth() + offset) + "px");
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

	//When the website is done loading all the stuff, and everything has been applied and calculated
	//we want to then remove the hidden stuff.
	$(window).on("load", function() {
		if ($(".ContainerForAll").hasClass("IsHidden")) {
			$(".ContainerForAll").removeClass("IsHidden");
		}
		//Reset the button here as well to be in the appropriate spot.
		let offset = -202.703;
		$(".ButtonAndContentWrapper").css("left", ($(".SideBarContainer").outerWidth() + offset) + "px");
	});
});

