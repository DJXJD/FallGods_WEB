package dev.djxjd.fallgods.services;

import dev.djxjd.fallgods.beans.Minigame;

public interface MinigameService extends DBEntityService<Minigame> {
	
	public Boolean existsByNameIgnoringCaseAndType(Minigame minigame);

}
