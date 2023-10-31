$(() => {
	let themeForm = $("#themeForm");
	if (themeForm[0]) {
		$("#theme").change((e) => {
			themeForm[0].submit();
		});
		themeForm[0].hidden = false;
	}
	function resizeElementWidthwise(e, widthChange) {
		let maxContent = $(e).css("min-width", "max-content").width();
		$(e).css("min-width", "");
		if (widthChange < 0) $(e).width("");
		while (e.scrollHeight > e.offsetHeight ||
				$(e).closest("table")[0].offsetLeft > 0 && $(e).width() < maxContent)
			$(e).width($(e).width() + 1);
	}
	$("table div[max-lines]").each((i, e) => {
		$(e).css("min-width", "max-content")
			.css("max-width", "max-content")
			.css("max-height", $(e).height() * $(e).attr("max-lines"))
			.css("min-width", "");
		resizeElementWidthwise(e);
	});
	let oldWindowWidth;
	$(window).resize(() => {
		$("table div[max-lines]").each((i, e) => resizeElementWidthwise(e, window.innerWidth - oldWindowWidth));
		oldWindowWidth = window.innerWidth;
	});
});