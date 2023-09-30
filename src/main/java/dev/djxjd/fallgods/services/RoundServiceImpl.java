package dev.djxjd.fallgods.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Service;

import dev.djxjd.fallgods.beans.Round;

@Service
public class RoundServiceImpl extends RESTEntityServiceImpl<Round> implements RoundService {

	public RoundServiceImpl(@Value("${FallGods.API.root}") String apiRoot, RestTemplateBuilder builder) {
		super(Round.class, Round[].class, builder.rootUri(apiRoot + "/rounds").build());
	}

	@Override
	public void putPlayerFinished(Long id, Long playerId, Boolean finished) {
		getRestTemplate().put("/" + id + "/playersFinished/" + playerId, finished);
	}

	@Override
	public void removePlayerFinished(Long id, Long playerId) {
		getRestTemplate().delete("/" + id + "/playersFinished/" + playerId);
	}

}
