package dev.djxjd.fallgods.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import dev.djxjd.fallgods.services.PlayerService;
import lombok.AllArgsConstructor;

@Controller
@RequestMapping("/view")
@SessionAttributes({ "theme", "group" })
@AllArgsConstructor
public class ViewController {
	
	private PlayerService pService;
	
	@GetMapping
	public String getViewRoot() {
		return "viewRoot";
	}
	
	@GetMapping("/players")
	public String getViewPlayers(Model model) {
		model.addAttribute("players", pService.getCollection());
		return "viewPlayers";
	}
	
	@GetMapping("/player/{id}")
	public String getViewPlayerDetails(@PathVariable Long id, Model model) {
		model.addAttribute("players", pService.getCollection());
		model.addAttribute("player", pService.getElement(id));
		return "viewPlayerDetails";
	}

}