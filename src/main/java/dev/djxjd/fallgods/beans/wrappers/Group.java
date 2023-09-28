package dev.djxjd.fallgods.beans.wrappers;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import dev.djxjd.fallgods.beans.Player;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Group {
	
	private List<Long> playerIds = new ArrayList<>(Collections.nCopies(4, null));
	
	public Set<Player> toSet() {
		return playerIds.stream()
				.filter(Objects::nonNull)
				.map(pId -> Player.builder().id(pId).build())
				.collect(Collectors.toSet());
	}

}
