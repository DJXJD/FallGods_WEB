package dev.djxjd.fallgods.beans;

import java.util.regex.Pattern;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@SuperBuilder
public abstract class DBEntity<T extends DBEntity<T>> {
	
	private Long id;
	
	protected DBEntity(String toString) {
		Pattern.compile("id=(\\d*)").matcher(toString).results().findFirst().ifPresent(mr -> id = Long.valueOf(mr.group(1)));
	}
	
	@SuppressWarnings("unchecked")
	public T setId(Long id) {
		this.id = id;
		return (T) this;
	}

}