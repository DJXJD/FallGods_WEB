package dev.djxjd.fallgods.beans;

import java.util.Map;
import java.time.Duration;
import java.util.Set;
import java.util.regex.Pattern;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import dev.djxjd.fallgods.beans.wrappers.MinigameData;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.Singular;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Data
@ToString(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@SuperBuilder
@JsonIdentityInfo(
		scope = Player.class,
		generator = ObjectIdGenerators.PropertyGenerator.class,
		property = "id")
public class Player extends RESTEntity<Player> implements Comparable<Player> {
	
	@ToString.Include
	private String name;
	
	@Singular
	@JsonIgnore
	@EqualsAndHashCode.Exclude
	private Set<GameSession> mainPlayerSessions;
	
	@Singular
	@JsonIgnore
	@EqualsAndHashCode.Exclude
	private Set<Match> matches;
	
	@Singular
	@JsonIgnore
	@EqualsAndHashCode.Exclude
	private Set<Round> mvpRounds;
	
	@Singular("mapData")
	private Map<Minigame, MinigameData> mapData;
	
	private MinigameData aggMapData;
	
	private int numMainPlayerSessions;
	private int numMatches;
	private int wins;
	private float winRate;
	private int losses;
	private float lossRate;
	private Duration inGameTime;
	
	public Player(String toString) {
		super(toString);
		Pattern.compile("name=(\\w*)").matcher(toString).results().findFirst().ifPresent(mr -> name = mr.group(1));
	}

	@Override
	public int compareTo(Player o) {
		return name.compareTo(o.name);
	}
	
}
