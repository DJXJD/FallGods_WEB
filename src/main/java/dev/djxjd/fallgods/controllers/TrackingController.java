package dev.djxjd.fallgods.controllers;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.beans.propertyeditors.StringTrimmerEditor;
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
@RequestMapping("/track")
@SessionAttributes({"theme", "group"})
@AllArgsConstructor
public class TrackingController {
	
	private RESTEntityService<Player> pService;
	private GameSessionService gsService;
	private RESTEntityService<Match> mService;
	private RESTEntityService<Minigame> mgService;
	private RoundService rService;
	
	@InitBinder
	public void initBinder(WebDataBinder binder) {
		binder.registerCustomEditor(Player.class, new StringTrimmerEditor(true));
	}
	
	@ModelAttribute
	public Group initGroup() {
		return new Group();
	}
	
	@GetMapping
	public String getTrackingRoot(@ModelAttribute(binding = false) Group group, Model model) {
		if (group.toSortedSet().isEmpty()) return "redirect:/track/setGroup";
		GameSession gs = gsService.getLatestWithMainPlayers(group.toSortedSet());
		model.addAttribute("gsHash", gs != null ? gs.hashCode() : 0);
		model.addAttribute("players", pService.getCollection());
		if (gs != null && !gs.isFinished()) {
			model.addAttribute("gameSession", gs);
			if (!gs.getLastMatch().isFinished()) {
				model.addAttribute("players", null);
				model.addAttribute("minigames", mgService.getCollection());
				if (!model.containsAttribute("newRound")) model.addAttribute("newRound", Round.builder()
						.match(gs.getLastMatch())
						.playersFinished(gs.getLastMatch().getPlayers().stream().collect(Collectors.toMap(p -> p, p -> true)))
						.build());
			} else if (!model.containsAttribute("newMatch"))
				model.addAttribute("newMatch", Match.builder().group(group).session(gs).build());
		} else if (!model.containsAttribute("newMatch"))
			model.addAttribute("newMatch", Match.builder().group(group).build());
		return "track";
	}
	
	@GetMapping("/setGroup")
	public String getSetGroup(Model model) {
		model.addAttribute("players", pService.getCollection());
		return "setGroup";
	}
	
	@PostMapping("/setGroup")
	public String processSetGroup(@ModelAttribute Group group) {
		return "redirect:/track";
	}
	
	@PostMapping("/addMatch")
	public String processAddMatch(@ModelAttribute(binding = false) Group group, @ModelAttribute Match newMatch,
			@RequestParam(defaultValue = "false") boolean osdt) {
		GameSession gs = gsService.getLatestWithMainPlayers(group.toSortedSet());
		if (gs != null && (!gs.getLastMatch().isFinished() || gs.isFinished() && newMatch.getSession().getId() != null) ||
				newMatch.getStartDateTime() != null && newMatch.getStartDateTime().isAfter(LocalDateTime.now()))
			return "redirect:/track";
		if (gs == null) gs = new GameSession();
		if ((gs.getId() == null || !gs.isFinished()) && (!Objects.equals(gs.getId(), newMatch.getSession().getId()) ||
				gs.getId() != null && (gs.getMatches().size() != newMatch.getSession().getMatches().size() ||
				newMatch.getStartDateTime() != null && newMatch.getStartDateTime().isBefore(gs.getLastMatch().getLastRound().getEndDateTime()))))
			return "redirect:/track";
		if (newMatch.getSession().getId() == null)
			newMatch.getSession().setId(gsService.addElement(GameSession.builder().mainPlayers(group.toSortedSet()).build()));
		if (!osdt || newMatch.getStartDateTime() == null) newMatch.setStartDateTime(LocalDateTime.now());
		mService.addElement(newMatch.setPlayers(newMatch.getGroup().toSortedSet()));
		return "redirect:/track";
	}
	
	@PostMapping("/endSession")
	public String processEndSession(@ModelAttribute(binding = false) Group group, @ModelAttribute GameSession session) {
		GameSession gs = gsService.getLatestWithMainPlayers(group.toSortedSet());
		if (gs != null && !gs.getLastMatch().isFinished()) return "redirect:/track";
		if (gs == null) gs = new GameSession();
		if (!Objects.equals(gs.getId(), session.getId()) || gs.getMatches().size() != session.getMatches().size())
			return "redirect:/track";
		gsService.replaceElement(gs.setFinished(true));
		return "redirect:/track";
	}
	
	@PostMapping("/addRound")
	public String processAddRound(@ModelAttribute(binding = false) Group group, @ModelAttribute Round newRound,
			@RequestParam(defaultValue = "false") boolean oedt) {
		GameSession gs = gsService.getLatestWithMainPlayers(group.toSortedSet());
		if (gs == null) return "redirect:/track";
		if (newRound.getMatch().getRounds() == null) newRound.getMatch().setRounds(new ArrayList<>());
		if (!gs.getLastMatch().getId().equals(newRound.getMatch().getId()) || gs.getLastMatch().isFinished() || newRound.getGameMode().getId() == null ||
				gs.getLastMatch().getRounds().size() != newRound.getMatch().getRounds().size() || newRound.getEndDateTime() != null && (
				newRound.getEndDateTime().isBefore(gs.getLastMatch().getStartDateTime()) || !gs.getLastMatch().getRounds().isEmpty() &&
				newRound.getEndDateTime().isBefore(gs.getLastMatch().getLastRound().getEndDateTime()) ||
				newRound.getEndDateTime().isAfter(LocalDateTime.now())))
			return "redirect:/track";
		if (!oedt || newRound.getEndDateTime() == null) newRound.setEndDateTime(LocalDateTime.now());
		Long rId = rService.addElement(newRound);
		if (rId != null && newRound.getPlayersFinished() != null)
			newRound.getPlayersFinished().forEach((p, f) -> rService.putPlayerFinished(rId, p.getId(), f));
		return "redirect:/track";
	}
	
	@PostMapping("/undo")
	public String processUndo(@ModelAttribute(binding = false) Group group, @RequestParam int gsHash, RedirectAttributes ra) {
		GameSession gs = gsService.getLatestWithMainPlayers(group.toSortedSet());
		if (gs == null || gs.hashCode() != gsHash) return "redirect:/track";
		if (gs.isFinished()) gsService.replaceElement(gs.setFinished(false));
		else if (gs.getLastMatch() != null && gs.getLastMatch().getLastRound() != null) {
			Round roundToDelete = gs.getLastMatch().getLastRound();
			rService.deleteElement(roundToDelete.getId());
			for (Player p : roundToDelete.getMatch().getPlayers())
				if (!roundToDelete.getPlayersFinished().containsKey(p)) roundToDelete.getPlayersFinished().put(p, null);
			roundToDelete.getMatch().getRounds().remove(roundToDelete);
			ra.addFlashAttribute("newRound", roundToDelete);
		} else if (gs.getLastMatch() != null) {
			if (gs.getMatches().indexOf(gs.getLastMatch()) != 0) {
				Match matchToDelete = gs.getLastMatch();
				mService.deleteElement(matchToDelete.getId());
				matchToDelete.getSession().getMatches().remove(matchToDelete);
				matchToDelete.setGroup(new Group(new ArrayList<>(matchToDelete.getPlayers())));
				ra.addFlashAttribute("newMatch", matchToDelete);
			} else {
				Match newMatch = gs.getLastMatch().setSession(null);
				gsService.deleteElement(gs.getId());
				ra.addFlashAttribute("newMatch", newMatch.setGroup(new Group(new ArrayList<>(newMatch.getPlayers()))));
			}
		}
		return "redirect:/track";
	}

}
