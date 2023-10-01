package dev.djxjd.fallgods.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Service;

import dev.djxjd.fallgods.beans.Player;

@Service
public class PlayerServiceImpl extends RESTEntityServiceImpl<Player> implements PlayerService {

	public PlayerServiceImpl(@Value("${FallGods.API.root}") String apiRoot, RestTemplateBuilder builder) {
		super(Player.class, Player[].class, builder.rootUri(apiRoot + "/players").build());
	}

	@Override
	public Boolean existsByNameIgnoringCase(String name) {
		if (name == null || name.isBlank()) return false;
		return getRestTemplate().getForObject("/exists?name={name}", Boolean.class, name);
	}

}
