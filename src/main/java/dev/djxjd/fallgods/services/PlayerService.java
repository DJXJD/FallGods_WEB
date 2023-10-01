package dev.djxjd.fallgods.services;

import dev.djxjd.fallgods.beans.Player;

public interface PlayerService extends RESTEntityService<Player> {
	
	public Boolean existsByNameIgnoringCase(String name);

}
