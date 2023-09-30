package dev.djxjd.fallgods.services;

import java.util.Set;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Service;

import dev.djxjd.fallgods.beans.GameSession;
import dev.djxjd.fallgods.beans.Player;

@Service
public class GameSessionServiceImpl extends RESTEntityServiceImpl<GameSession> implements GameSessionService {
	
	public GameSessionServiceImpl(@Value("${FallGods.API.root}") String apiRoot, RestTemplateBuilder builder) {
		super(GameSession.class, GameSession[].class, builder.rootUri(apiRoot + "/sessions").build());
	}

	@Override
	public GameSession getLatestWithMainPlayers(Set<Player> mainPlayers) {
		return getRestTemplate().postForObject("/latest", mainPlayers, getClazz());
	}

}
