package dev.djxjd.fallgods.services;

import java.util.List;

import org.springframework.web.client.RestTemplate;

import dev.djxjd.fallgods.beans.DBEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public abstract class DBEntityServiceImpl<T extends DBEntity<T>> implements DBEntityService<T> {

	private Class<T> clazz;
	private Class<T[]> clazzArray;
	private RestTemplate restTemplate;

	@Override
	public T getElement(Long id) {
		return restTemplate.getForObject("/" + id, clazz);
	}

	@Override
	public T[] getCollection() {
		return restTemplate.getForObject("/", clazzArray);
	}

	@Override
	public Long addElement(T t) {
		return restTemplate.postForObject("/", t, Long.class);
	}

	@Override
	public void replaceElement(T t) {
		restTemplate.put("/" + t.getId(), t);
	}
	
	@Override
	public void replaceCollection(List<T> ts) {
		restTemplate.put("/", ts);
	}

	@Override
	public void replaceCollection(List<T> ts, boolean cascade) {
		restTemplate.put("/?cascade={cascade}", ts, cascade);
	}
	
	@Override
	public void deleteElement(Long id) {
		restTemplate.delete("/" + id);
	}

	@Override
	public void deleteElement(Long id, boolean cascade) {
		restTemplate.delete("/" + id + "?cascade={cascade}", cascade);
	}
	
	@Override
	public void deleteCollection() {
		restTemplate.delete("/");
	}

	@Override
	public void deleteCollection(boolean cascade) {
		restTemplate.delete("/?cascade={cascade}", cascade);
	}

}
