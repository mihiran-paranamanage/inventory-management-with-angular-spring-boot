package com.ims.server.item;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(excerptProjection = ItemExcerpt.class)
public interface ItemRepository extends PagingAndSortingRepository<Item, Long> {

}
