package dev.djxjd.fallgods.controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class TrackWebSocketController {

	@MessageMapping("/newRoundUpdate")
	@SendTo("/updateTracking/newRound")
	public String sendnewRoundUpdate(String message) {
		return message; 
	}

	@MessageMapping("/undoUpdate")
	@SendTo("/updateTracking/undoCalled")
	public String sendUndoUpdate(String message) {
		return message;
	}

	@MessageMapping("/endSessionUpdate")
	@SendTo("/updateTracking/endSession")
	public String sendEndSessionUpdate(String message) {
		return message;
	}

	@MessageMapping("/addMatchUpdate")
	@SendTo("/updateTracking/addMatch")
	public String sendAddMatchUpdate(String message) {
		return message;
	}
}