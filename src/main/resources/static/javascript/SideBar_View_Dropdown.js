$(() => {
	let DarkMode = !($("#ThemeSelectorAction").attr("data-swapTo") == "LIGHT");

	if ($(".ContainerForAll").hasClass("IsHidden")) {
		$(".ContainerForAll").removeClass("IsHidden");
	}

	CheckSideBarStatus();
	CheckAccordionViewStatus();

	function SetCollapseExpandButtonValues(displayType) {
		let ArrowDefaultSizeX = 4.93;
		let ArrowDefaultSizeY = 8;

		if (displayType === "flex") {
			console.log($(".CircleWrapper").width());
			let circleWrapperOffset = $(".CircleWrapper").width() / 2;
			let sidebarWidth = $(".SideBarContainer").width();
			$(".ButtonAndContentWrapper").css("left", (sidebarWidth - circleWrapperOffset)+ "px");
		}
	}

	//For displaying the accordion style view links
	$(".accordion").on("click", function() {
		if ($(".accordion").next().css("display") === "flex") {
			SetAccordionView("none");
		} else if ($(".accordion").next().css("display") === "none") {
			SetAccordionView("flex");
		}
	});

	//For opening and closing the side bar
	$(".OpenCloseBtn").click(() => {
		if (localStorage.getItem("SideBar") === "none") {
			SetSideBarView("flex");

			//When button is pressed, we need to make sure we reset the button position
			SetCollapseExpandButtonValues("flex");
		} else {
			SetSideBarView("none");
			//When button is pressed, we need to make sure we reset the button position
			SetCollapseExpandButtonValues("none");
		}

	});

	//Check the sidebar status to set to on load
	function CheckSideBarStatus() {
		if (localStorage.getItem("SideBar") === "flex") {
			SetSideBarView("flex");
			SetCollapseExpandButtonValues("flex");
		} else if (localStorage.getItem("SideBar") === "none") {
			SetSideBarView("none");
			SetCollapseExpandButtonValues("none");
		} else {
			localStorage.setItem("SideBar", "flex");
			CheckSideBarStatus();
		}
	}

	//Check the accordion view menu status to set to on load
	function CheckAccordionViewStatus() {
		if (localStorage.getItem("AccordionView") === "flex") {
			SetAccordionView("flex");
		} else if (localStorage.getItem("AccordionView") === "none") {
			SetAccordionView("none");
		} else {
			localStorage.setItem("AccordionView", "none");
			CheckAccordionViewStatus();
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
			$(".SideBarLinkText, footer, .FallGodsLogoText").hide();
			$(".ViewArrowContainer").hide();
			$(".SideBarArrowLeft").hide();
			$(".SideBarArrowRight").show();
			localStorage.setItem("SideBar", "none");
			$("#SideBarExpandIconRight").show();
			$(".ButtonAndContentWrapper").hide();

			$("#SwitchLeftCircle").hide();
			$("#SwitchRightCircle").show();

			$("#switchtoggleoff").hide();
			$("#switchtoggleon").hide();

			if ($("#darkmodeicon").css("color") == "rgb(255, 255, 255)") {
				$("#lightmodeicon").hide();
				$("#darkmodeicon").css("padding-left", "5px");
				$("#darkmodeicon").css("padding-right", "5px");

			} else if ($("#lightmodeicon").css("color") == "rgb(255, 255, 255)") {
				$("#darkmodeicon").hide();
				$("#lightmodeicon").css("padding-left", "5px");
				$("#lightmodeicon").css("padding-right", "5px");
			}

			$(".ViewInnerContainer").css("background-color", "");
			$(".ViewInnerContainer").css("border-radius", "0px");
			$(".SideBarIcon").css("padding", "0px 5px 0px 5px");
			$(".panel").css("padding", "0px 0px 0px");
			if ($(".panel").css("display") === "flex") {
				$(".ViewInnerContainer").css("background-color", "rgba(122,122,122,0.08)");
				$(".ViewInnerContainer").css("border-radius", "5px");
			}
			$(".footer").css("border-top", "1px solid #2e2e32");
		} else if (displayType === "flex") {
			$("#SideBarExpandIconRight").hide();
			$("#SwitchLeftCircle").show();
			$("#SwitchRightCircle").hide();
			$(".ButtonAndContentWrapper").show();
			$(".SideBarLinkText, footer, .FallGodsLogoText").show();
			$(".ViewArrowContainer").show();
			$(".SideBarArrowLeft").show();
			$(".SideBarArrowRight").hide();
			localStorage.setItem("SideBar", "flex");

			if (DarkMode) {
				$("#switchtoggleoff").hide();
				$("#switchtoggleon").show();

			} else {
				$("#switchtoggleoff").show();
				$("#switchtoggleon").hide();
			}

			console.log($("#darkmodeicon").css("color") == "rgb(255, 255, 255)");

			$("#lightmodeicon").show();
			$("#darkmodeicon").show();

			$("#darkmodeicon").css("padding-left", "0px");
			$("#darkmodeicon").css("padding-right", "0px");
			$("#lightmodeicon").css("padding-left", "0px");
			$("#lightmodeicon").css("padding-right", "0px");

			if ($(".panel").css("display") === "flex") {
				$(".ViewInnerContainer").css("background-color", "");
				$(".ViewInnerContainer").css("border-radius", "");
			}
			$(".SideBarIcon").css("padding", "0px 5px 0px 5px");
			$(".panel").css("padding", "0px 0px 0px 30px");
			$(".footer").css("border-top", "1px solid #2e2e32;");
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

	$("#ThemeSelectorAction").click((e) => {
		console.log($(e.currentTarget).attr("data-swapTo"));

		$(`#theme option[value='${$(e.currentTarget).attr("data-swapTo")}']`).attr("selected", true).change();
	});

});
