package dev.djxjd.fallgods.services;

import dev.djxjd.fallgods.beans.Player;

public interface PlayerService extends DBEntityService<Player> {
	
	public Boolean existsByNameIgnoringCase(String name);

}
