$(() => {
	$(".td-folder-icon").click((e) => {
		$(e.currentTarget).children().toggle()
				.closest("tr").next().toggle();
	});
	$("#expandAll").click(() => {
		$(".td-folder-icon").each((i, e) => {
			$(e).children().first().hide().next().show();
		});
		$("tr:hidden").show();
	});
	$("#collapseAll").click(() => {
		$(".td-folder-icon").each((i, e) => {
			$(e).children().first().show().next().hide()
					.closest("tr").next().hide();
		});
	});
});