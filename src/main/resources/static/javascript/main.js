$(() => {
	let themeForm = $("#themeForm");
	if (themeForm[0]) {
		$("#theme").change((e) => {
			themeForm[0].submit();
		});
		themeForm[0].hidden = false;
	}
});