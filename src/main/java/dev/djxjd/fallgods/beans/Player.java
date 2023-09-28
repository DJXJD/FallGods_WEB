package dev.djxjd.fallgods.beans;

import java.util.Set;
import java.util.regex.Pattern;

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
		scope = Player.class,
		generator = ObjectIdGenerators.PropertyGenerator.class,
		property = "id")
public class Player extends DBEntity<Player> implements Comparable<Player> {
	
	private String name;
	
	@Singular
	@JsonIgnore
	@ToString.Exclude
	private Set<GameSession> sessions;
	
	@Singular
	@JsonIgnore
	@ToString.Exclude
	private Set<Match> matches;
	
	public Player(String toString) {
		super(toString);
		name = Pattern.compile("name=(\\w*)").matcher(toString).results().findFirst().orElseThrow().group(1);
	}

	@Override
	public int compareTo(Player o) {
		return name.compareTo(o.name);
	}
	
}
