package dev.djxjd.fallgods.controllers;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import dev.djxjd.fallgods.beans.GameSession;
import dev.djxjd.fallgods.beans.Match;
import dev.djxjd.fallgods.beans.Minigame;
import dev.djxjd.fallgods.beans.Player;
import dev.djxjd.fallgods.beans.Round;
import dev.djxjd.fallgods.beans.wrappers.Group;
import dev.djxjd.fallgods.services.RESTEntityService;
import dev.djxjd.fallgods.services.GameSessionService;
import dev.djxjd.fallgods.services.RoundService;
import lombok.AllArgsConstructor;


@Controller
@RequestMapping("/view")
@SessionAttributes({ "theme", "group" })
@AllArgsConstructor
public class ViewController {

@GetMapping
	public String getViewRoot() {
		return "view";
	}

}