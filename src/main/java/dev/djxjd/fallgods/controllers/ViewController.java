package dev.djxjd.fallgods.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import dev.djxjd.fallgods.services.PlayerService;
import lombok.AllArgsConstructor;

@Controller
@RequestMapping("/view")
@SessionAttributes("theme")
@AllArgsConstructor
public class ViewController {
	
	private PlayerService pService;
	
	@GetMapping
	public String getViewRoot(Model model) {
		model.addAttribute("players", pService.getCollection());
		return "view";
	}

}
