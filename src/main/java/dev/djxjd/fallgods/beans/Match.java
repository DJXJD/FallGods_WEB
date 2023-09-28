package dev.djxjd.fallgods.beans;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.SortedSet;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import dev.djxjd.fallgods.beans.wrappers.Group;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Singular;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@SuperBuilder
@JsonIdentityInfo(
		scope = Match.class,
		generator = ObjectIdGenerators.PropertyGenerator.class,
		property = "id")
public class Match extends DBEntity<Match> {
	
	private LocalDateTime startDateTime;
	
	@Singular
	@ToString.Exclude
	private SortedSet<Player> players;
	
	@JsonIgnore
	private Group group;
	
	@Singular
	@ToString.Exclude
	private List<Round> rounds;
	
	@ToString.Exclude
	private GameSession session;
	
	private boolean finished;
	private boolean won;
	private Duration duration;
	
	public Match(String toString) {
		super(toString);
	}
	
	@JsonIgnore
	public String getSubs() {
		String subs = "";
		String in = players.stream()
				.filter(p -> !session.getMainPlayers().contains(p))
				.map(Player::getName)
				.collect(Collectors.joining(", ", "In: ", ";"));
		String out = session.getMainPlayers().stream()
				.filter(mp -> !players.contains(mp))
				.map(Player::getName)
				.collect(Collectors.joining(", ", "Out: ", ";"));
		if (!in.equals("In: ;")) subs += in + " ";
		if (!out.equals("Out: ;")) subs += out;
		return subs.strip();
	}
	
	@JsonIgnore
	public Round getLastRound() {
		if (rounds == null || rounds.isEmpty()) return null;
		return rounds.get(rounds.size() - 1);
	}

}
