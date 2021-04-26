package com.ims.server.itemAction;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(excerptProjection = ItemActionExcerpt.class)
public interface ItemActionRepository extends PagingAndSortingRepository<ItemAction, Long> {

}
