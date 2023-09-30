package dev.djxjd.fallgods.services;

import java.util.Set;

import dev.djxjd.fallgods.beans.GameSession;
import dev.djxjd.fallgods.beans.Player;

public interface GameSessionService extends RESTEntityService<GameSession> {
	
	public GameSession getLatestWithMainPlayers(Set<Player> mainPlayers);

}
