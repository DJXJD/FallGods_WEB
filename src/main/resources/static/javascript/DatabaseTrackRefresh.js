const socket = new SockJS('/TrackWebSocket'); // WebSocket endpoint defined in WebSocketConfig
const stompClient = Stomp.over(socket);

stompClient.connect({}, () => {
    stompClient.subscribe('/topic/newRound', () => {
        location.reload();
    });
});