package dev.djxjd.fallgods.beans;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Singular;
import lombok.ToString;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@Accessors(chain = true)
@ToString(callSuper = true)
@NoArgsConstructor
@SuperBuilder
@JsonIdentityInfo(
		scope = Round.class,
		generator = ObjectIdGenerators.PropertyGenerator.class,
		property = "id")
public class Round extends DBEntity<Round> {
	
	private LocalDateTime endDateTime;
	@Builder.Default
	private Boolean teamQualified = true;
	
	@Singular("playerFinished")
	@ToString.Exclude
	private Map<Player, Boolean> playersFinished; // ensure null values work (mostly client side stuff)
	
	private boolean earlyFinalRound;
	private String notes;
	
	private Minigame gameMode;
	private Match match;
	
	private Byte num;
	private Duration duration;
	private boolean finalRound;
	
	public Round(String toString) {
		super(toString);
	}
	
	@JsonIgnore
	public String getLosers() {
		return playersFinished.keySet().stream()
				.filter(k -> playersFinished.get(k).equals(false))
				.map(Player::getName)
				.collect(Collectors.joining(", "));
	}
	
}
