$(() => {
	let themeForm = $("#themeForm");
	if (themeForm[0]) {
		$("#theme").change((e) => {
			themeForm[0].submit();
		});
		themeForm[0].hidden = false;
	}
	function resizeTDWidthwise(e, widthChange) {
		let maxContent = $(e).css("min-width", "max-content").width();
		$(e).css("min-width", "");
		if (widthChange < 0) $(e).width("");
		while (e.scrollHeight > e.offsetHeight ||
				$(e).closest("table")[0].offsetLeft > 0 && $(e).width() < maxContent)
			$(e).width($(e).width() + 1);
	}
	$("td div[max-lines]").each((i, e) => {
		$(e).css("min-width", "max-content")
			.css("max-width", "max-content")
			.css("max-height", $(e).height() * $(e).attr("max-lines"))
			.css("min-width", "");
		resizeTDWidthwise(e);
	});
	let oldWindowWidth;
	$(window).resize(() => {
		$("td div[max-lines]").each((i, e) => resizeTDWidthwise(e, window.innerWidth - oldWindowWidth));
		oldWindowWidth = window.innerWidth;
	});
});