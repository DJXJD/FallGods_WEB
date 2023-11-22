package dev.djxjd.fallgods.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;

@Controller
@SessionAttributes("theme")
@ControllerAdvice
public class RootController {
	
	public enum Theme {
		LIGHT, DARK
	}

	@ModelAttribute
	public Theme initTheme() {
		return Theme.DARK;
	}
	
	@ModelAttribute("themes")
	public Theme[] initThemes() {
		return Theme.values();
	}
	
	@GetMapping("/")
	public String getRoot() {
		return "index";
	}
	

	@GetMapping("AboutUs")
	public String getAboutUs() {
		return "AboutUs";
	}
	
	@GetMapping("FAQ")
	public String getFAQ() {
		return "FAQ";
	}
	
	@PostMapping("/setTheme")
	public String setTheme(@RequestParam Theme name, @RequestParam String sourcePath, Model model) {
		model.addAttribute("theme", name);
		return "redirect:" + sourcePath;
	}
}
