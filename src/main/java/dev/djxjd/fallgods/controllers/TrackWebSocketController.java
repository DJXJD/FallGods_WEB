package dev.djxjd.fallgods.controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class TrackWebSocketController {

    @MessageMapping("/update")
    @SendTo("/topic/newRound")
    public String sendUpdate(String message) {
        // Process the message if needed
        return message; // Broadcast the message to all subscribers
    }
}