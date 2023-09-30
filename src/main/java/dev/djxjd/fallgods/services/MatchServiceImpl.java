package dev.djxjd.fallgods.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Service;

import dev.djxjd.fallgods.beans.Match;

@Service
public class MatchServiceImpl extends RESTEntityServiceImpl<Match> {
	
	public MatchServiceImpl(@Value("${FallGods.API.root}") String apiRoot, RestTemplateBuilder builder) {
		super(Match.class, Match[].class, builder.rootUri(apiRoot + "/matches").build());
	}
	
}
