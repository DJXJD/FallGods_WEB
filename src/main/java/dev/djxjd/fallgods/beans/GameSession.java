package dev.djxjd.fallgods.beans;

import java.time.Duration;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Singular;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@SuperBuilder
@JsonIdentityInfo(
		scope = GameSession.class,
		generator = ObjectIdGenerators.PropertyGenerator.class,
		property = "id")
public class GameSession extends RESTEntity<GameSession> {
	
	@Singular
	@ToString.Exclude
	private Set<Player> mainPlayers;
	
	@Singular
	@ToString.Exclude
	private List<Match> matches;
	
	@JsonIgnore
	public Match getLastMatch() {
		if (matches == null || matches.isEmpty()) return null;
		return matches.get(matches.size() - 1);
	}
	
	@JsonIgnore
	public String getMainPlayerNames() {
		return mainPlayers.stream()
				.sorted()
				.map(Player::getName)
				.collect(Collectors.joining(", "));
	}
	
	private boolean finished;
	private String notes;
	
	private int wins;
	private int losses;
	private float winRate;
	private List<List<Match>> streaks;
	private int currentStreak;
	private int highestStreak;
	private Long priorStreakSessionId;
	private Integer priorStreakSize;
	private Long lastStreakContinuedSessionId;
	private Duration duration;

}
