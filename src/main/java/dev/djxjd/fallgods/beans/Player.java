package dev.djxjd.fallgods.beans;

import java.util.List;
import java.util.Set;
import java.util.regex.Pattern;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.Singular;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@SuperBuilder
@JsonIdentityInfo(
		scope = Player.class,
		generator = ObjectIdGenerators.PropertyGenerator.class,
		property = "id")
public class Player extends DBEntity<Player> implements Comparable<Player> {
	
	private String name;
	
	@Singular
	@JsonIgnore
	@ToString.Exclude
	@EqualsAndHashCode.Exclude
	private Set<GameSession> sessions;
	
	@Singular
	@JsonIgnore
	@ToString.Exclude
	@EqualsAndHashCode.Exclude
	private Set<Match> matches;
	
	@Singular
	@JsonIgnore
	@ToString.Exclude
	@EqualsAndHashCode.Exclude
	private List<Round> mvpRounds;
	
	public Player(String toString) {
		super(toString);
		Pattern.compile("name=(\\w*)").matcher(toString).results().findFirst().ifPresent(mr -> name = mr.group(1));
	}

	@Override
	public int compareTo(Player o) {
		return name.compareTo(o.name);
	}
	
}
