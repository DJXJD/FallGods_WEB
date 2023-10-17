package dev.djxjd.fallgods.beans;

import java.util.List;
import java.util.regex.Pattern;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@SuperBuilder
@JsonIdentityInfo(
		scope = Minigame.class,
		generator = ObjectIdGenerators.PropertyGenerator.class,
		property = "id")
public class Minigame extends RESTEntity<Minigame> {
	
	private String name;
	private GameType type;
	
	@JsonIgnore
	@ToString.Exclude
	@EqualsAndHashCode.Exclude
	private List<Round> rounds;
	
	public Minigame(String toString) {
		super(toString);
		Pattern.compile("name=([\\w\\h-']*)").matcher(toString).results().findFirst().ifPresent(mr -> {
			if (!mr.group(1).equals("null")) name = mr.group(1);
		});
		Pattern.compile("type=(\\w*)").matcher(toString).results().findFirst().ifPresent(mr -> {
			if (!mr.group(1).equals("null")) type = GameType.valueOf(mr.group(1));
		});
	}
	
	public String getFriendlyName() {
		return name + " - " + type;
	}
	
	public enum GameType {
		FINAL,
		TEAM,
		LOGIC,
		HUNT,
		SURVIVAL,
		RACE
	}
	
}