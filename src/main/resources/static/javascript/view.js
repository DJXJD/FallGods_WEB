$(() => {
    //Obtain player data    
    const playersData = [
        { name: 'David', map: 'Map 1', plays: 5, qualificationRate: 80 },
        { name: 'Alice', map: 'Map 2', plays: 8, qualificationRate: 70 },
    ];
    function generateTable(data) {
        const table = $('#playerTable');
        table.empty();
        const thead = $('<thead>');
        const headerRow = $('<tr>');
        headerRow.append('<th>Name</th><th>Map</th><th>Plays</th><th>Qualification Rate</th>');
        thead.append(headerRow);
        table.append(thead);
        const tbody = $('<tbody>');
        data.forEach(player => {
            const row = $('<tr>');
            row.append(`<td>${player.name}</td>`);
            row.append(`<td>${player.map}</td>`);
            row.append(`<td>${player.plays}</td>`);
            row.append(`<td>${player.qualificationRate}%</td>`);
            tbody.append(row);
        });
        table.append(tbody);
    }
    generateTable(playersData);
    $('.navbar a').click(function() {
        const filter = $(this).text();
        const filteredData = filterData(playersData, filter);
        generateTable(filteredData);
    });
    function filterData(data, filter) {
        return data.filter(player => player.map === filter);
    }
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
		$("#gmBox").val($(`#gmRow option[data-value='${$("#gmId").val()}']`).text());
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
			$(`#pf${i}, #pf${i}cb`).each((i, element) => {
				element.disabled = e.checked;
			});
			$(e).change((event) => {
				$(`#pf${i}`).val($(`#pf${i}cb`)[0].checked);
				$(`#pf${i}, #pf${i}cb`).each((i, element) => {
					element.disabled = event.target.checked;
				});
			});
		});
		$(".pfrow").each((i, e) => {
			e.hidden = false;
		});
	};
});

/*
// Map Frequency Polar Chart
	let ctx1 = document.getElementById('pcRoundFrequency').getContext('2d');
	let gameModeCounts = {};
	let polarChart = new Chart(ctx1, {
    	type: 'polarArea',
    	data: {
        	labels: [],
        	datasets: [{
            	data: [],
            	backgroundColor: [
          'rgba(63, 81, 181, 0.5)', 'rgba(77, 182, 172, 0.5)', 'rgba(66, 133, 244, 0.5)', 'rgba(156, 39, 176, 0.5)', 'rgba(233, 30, 99, 0.5)', 'rgba(66, 73, 244, 0.4)','rgba(66, 133, 244, 0.2)'],
        	}]
    	},
    	options: {
        	scale: {
            	ticks: {
                	beginAtZero: true,
                	stepSize: 1,
                	max: 10
        		},
        		angleLines: {
            		display: true
        		},
        		pointLabels: {
            		display: true,
            		fontColor: 'black',
            		fontSize: 14
            	}
        	},
    		legend: {
        		display: false
    		}
    	}
	});
	// Rounds Outcome Line Chart
	var ctx2 = $('#lcRoundOutcome')[0].getContext('2d');
	var rounds = ['Round 1', 'Round 2', 'Round 3', 'Round 4'];
	var results = [0, 1, 0, 1]; // 0 for loss, 1 for win
	var data = {
    	labels: rounds,
    	datasets: [{
        	label: 'Win/Loss',
        	data: results,
        	borderColor: 'rgba(75, 192, 192, 1)',
        	borderWidth: 1,
        	fill: false 
    	}]
	};
	var config = {
    	type: 'line',
    	data: data,
    	options: {
        	scales: {
        		y: {
                	beginAtZero: true,
                	ticks: {
                    	callback: function(value) {
                        	if (value % 1 === 0) {
                            	return value;
                        	}
                    	},
                    	max: 1, 
                	}
            	}
        	}
    	}
	};
	var RoundOutcome = new Chart(ctx2, config);
	
	
	
	
	
	$("form").on('submit', function(e) {
		let selectedGameMode = $(this).find('#gmBox').val();
        if (selectedGameMode) {
        	gameModeCounts[selectedGameMode] = (gameModeCounts[selectedGameMode] || 0) + 1;
        	polarChart.data.labels = Object.keys(gameModeCounts);
        	polarChart.data.datasets[0].data = Object.values(gameModeCounts);
        	polarChart.update();
    	} else {
        	console.log('Game mode is not selected');
    	}
	});
})*/