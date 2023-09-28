$(() => {
	if ($("#osdt")[0]) {
		$("#osdt").change((e) => {
			$("#sdtRow")[0].hidden = !e.target.checked;
			$("#sdt")[0].disabled = !e.target.checked;
		});
		$("#osdtRow")[0].hidden = false;
	}
	if ($("#oedt")[0]) {
		$("#oedt").change((e) => {
			$("#edtRow")[0].hidden = !e.target.checked;
			$("#edt")[0].disabled = !e.target.checked;
		});
		$("#oedtRow")[0].hidden = false;
	}
	if ($("#gmRow")[0]) {
		$("#gmBox").on("input", (e) => {
			$(`#gmRow option:contains(${e.target.value})`).each((i, element) => {
				if (e.target.value === element.text) $("#gmId").val($(element).attr("data-value"));
				else $("#gmId").val("");
			});
		});
		$("#gmRow")[0].hidden = false;
	}
	if ($(".pfrow")[0]) {
		$("[id^='pf'][id$='cb']").each((i, e) => {
			e.checked = $(`#pf${i}`).val() === "true";
			$(e).change((event) => {
				$(`#pf${i}`).val(event.target.checked);
			});
		});
		$("[id^='pf'][id$='null']").each((i, e) => {
			$(e).change((event) => {
				$(`#pf${i}, #pf${i}cb`).each((i, element) => {
					element.disabled = event.target.checked;
				});
			});
		});
		$(".pfrow").each((i, e) => {
			e.hidden = false;
		});
	}
});