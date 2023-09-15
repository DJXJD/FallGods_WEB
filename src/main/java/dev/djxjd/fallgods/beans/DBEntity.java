package dev.djxjd.fallgods.beans;

import java.util.regex.Pattern;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Getter
@ToString
@NoArgsConstructor
@SuperBuilder
public abstract class DBEntity<T extends DBEntity<T>> {
	
	private Long id;
	
	protected DBEntity(String toString) {
		id = Long.valueOf(Pattern.compile("id=(\\d*)").matcher(toString).results().findFirst().orElseThrow().group(1));
	}
	
	@SuppressWarnings("unchecked")
	public T setId(Long id) {
		this.id = id;
		return (T) this;
	}

	@Override
	public int hashCode() {
		return getClass().hashCode();
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		@SuppressWarnings("unchecked")
		T other = (T) obj;
		return id != null && id.equals(other.getId());
	}

}
