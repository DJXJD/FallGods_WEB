package dev.djxjd.fallgods.services;

import java.util.List;

import dev.djxjd.fallgods.beans.DBEntity;

public interface DBEntityService<T extends DBEntity<T>> {
	
	public T getElement(Long id);
	public T[] getCollection();
	public Long addElement(T t);
	public void replaceElement(T t);
	public void replaceCollection(List<T> ts);
	public void replaceCollection(List<T> ts, boolean cascade);
	public void deleteElement(Long id);
	public void deleteElement(Long id, boolean cascade);
	public void deleteCollection();
	public void deleteCollection(boolean cascade);

}
