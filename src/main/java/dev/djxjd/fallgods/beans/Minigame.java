package dev.djxjd.fallgods.beans;

import java.util.List;

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
public class Minigame extends DBEntity<Minigame> {
	
	private String name;
	private GameType type;
	
	@JsonIgnore
	@ToString.Exclude
	@EqualsAndHashCode.Exclude
	private List<Round> rounds;
	
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