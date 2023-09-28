package dev.djxjd.fallgods.beans.wrappers;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.SortedSet;
import java.util.TreeSet;
import java.util.stream.Collectors;

import dev.djxjd.fallgods.beans.Player;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Group {
	
	private List<Player> players = new ArrayList<>(Collections.nCopies(4, null));
	
	public SortedSet<Player> toSet() {
		return players.stream()
				.filter(Objects::nonNull)
				.collect(Collectors.toCollection(TreeSet::new));
	}

}
