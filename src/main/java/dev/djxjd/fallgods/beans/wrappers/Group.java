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
	
	int size = 4;
	
	private List<Player> players = new ArrayList<>(Collections.nCopies(size, null));
	
	public SortedSet<Player> toSortedSet() {
		return players.stream()
				.filter(Objects::nonNull)
				.collect(Collectors.toCollection(TreeSet::new));
	}
	
	public Group(List<Player> players) {
		if (players.size() > size) players = players.subList(0, size);
		while (players.size() < size) players.add(null);
		this.players = players;
	}

}
