$(() => {
    $(document).on("mousemove", function(event) {
        if (event.clientY <= window.innerHeight * 0.25) {
            $(".navbar").css("height", "50px");
            $("body").css("padding-top", "50px");
        } else {
            $(".navbar").css("height", "0");
            $("body").css("padding-top","0");
        }
    });
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