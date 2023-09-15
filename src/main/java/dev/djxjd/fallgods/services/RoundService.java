package dev.djxjd.fallgods.services;

import dev.djxjd.fallgods.beans.Round;

public interface RoundService extends DBEntityService<Round> {
	
	public void putPlayerFinished(Long id, Long playerId, Boolean finished);
	public void removePlayerFinished(Long id, Long playerId);

}
