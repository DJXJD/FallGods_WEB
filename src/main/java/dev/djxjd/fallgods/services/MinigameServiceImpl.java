package dev.djxjd.fallgods.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Service;

import dev.djxjd.fallgods.beans.Minigame;

@Service
public class MinigameServiceImpl extends DBEntityServiceImpl<Minigame> implements MinigameService {
	
	public MinigameServiceImpl(@Value("${FallGods.API.root}") String apiRoot, RestTemplateBuilder builder) {
		super(Minigame.class, Minigame[].class, builder.rootUri(apiRoot + "/minigames").build());
	}

	@Override
	public Boolean existsByNameIgnoringCaseAndType(Minigame minigame) {
		if (minigame.getName() == null || minigame.getName().isBlank() || minigame.getType() == null) return false;
		return getRestTemplate().getForObject("/exists?name={name}&type={type}", Boolean.class, minigame.getName(), minigame.getType());
	}

}
