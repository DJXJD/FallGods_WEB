$(() => {
	$("#playerSelector").change((e) => {
		$("#playerSelectorForm").attr("action", e.target.value);
		$("#playerSelectorForm").submit();
	});
	$("#playerSelectorForm")[0].hidden = false;
});