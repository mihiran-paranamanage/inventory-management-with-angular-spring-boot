package com.ims.server.repository;

import org.springframework.data.repository.CrudRepository;

import com.ims.server.entity.Item;

public interface ItemRepository extends CrudRepository<Item, Integer> {

}
