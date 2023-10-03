const socket = new SockJS('/TrackWebSocket'); // WebSocket endpoint defined in WebSocketConfig
const stompClient = Stomp.over(socket);

//We don't need all the debug info printing to console, so this overwrites this.
stompClient.debug = () => {}

//Set a random client id which will be grabbed from the html and sent to the controller so we dont reload this current clients page
//if they are the one who sent the message
const clientId = Math.random().toString(36).substr(2, 9);

$(() => {
	$(".clientID").val(clientId);
});


stompClient.connect({}, () => {

	stompClient.subscribe("/updateTracking/undoCalled", (message) => {
		console.log("My client id is: " + clientId + "\n other user client id is: " + message.body);
		if (clientId !== message.body) {
			location.reload();
		}
	})

	stompClient.subscribe('/updateTracking/newRound', (message) => {
		console.log("My client id is: " + clientId + "\n other user client id is: " + message.body);
		if (clientId !== message.body) {
			location.reload();
		}
	});

	stompClient.subscribe('/updateTracking/endSession', (message) => {
		console.log("My client id is: " + clientId + "\n other user client id is: " + message.body);
		if (clientId !== message.body) {
			location.reload();
		}
	});

	stompClient.subscribe('/updateTracking/addMatch', (message) => {
		console.log("My client id is: " + clientId + "\n other user client id is: " + message.body);
		if (clientId !== message.body) {
			location.reload();
		}
	});
});