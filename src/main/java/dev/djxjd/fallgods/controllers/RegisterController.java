package dev.djxjd.fallgods.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import dev.djxjd.fallgods.beans.Minigame;
import dev.djxjd.fallgods.beans.Minigame.GameType;
import dev.djxjd.fallgods.beans.Player;
import dev.djxjd.fallgods.services.MinigameService;
import dev.djxjd.fallgods.services.PlayerService;
import lombok.AllArgsConstructor;

@Controller
@RequestMapping("/register")
@SessionAttributes("theme")
@AllArgsConstructor
public class RegisterController {
	
	private PlayerService pService;
	private MinigameService mgService;
	
	@GetMapping
	public String getRegister(Model model) {
		model.addAttribute("newMinigame", new Minigame());
		model.addAttribute("gameTypes", GameType.values());
		return "register";
	}
	
	@PostMapping("/addPlayer")
	public String processRegisterPlayer(@RequestParam String name, RedirectAttributes ra) {
		if (name.isEmpty() || !name.matches("\\w*")) ra.addFlashAttribute("rpError", "Invalid name");
		else if (Boolean.TRUE.equals(pService.existsByNameIgnoringCase(name))) ra.addFlashAttribute("rpError", "Player already exists");
		else pService.addElement(Player.builder().name(name).build());
		return "redirect:/register";
	}
	
	@PostMapping("/addMinigame")
	public String processRegisterMinigame(@ModelAttribute Minigame newMinigame, RedirectAttributes ra) {
		if (newMinigame.getName().isEmpty()) ra.addFlashAttribute("rmgError", "Invalid name");
		else if (newMinigame.getType() == null) ra.addFlashAttribute("rmgError", "Invalid type");
		else if (Boolean.TRUE.equals(mgService.existsByNameIgnoringCaseAndType(newMinigame)))
			ra.addFlashAttribute("rmgError", "Minigame already exists");
		else mgService.addElement(newMinigame);
		return "redirect:/register";
	}

}
