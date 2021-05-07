package com.ims.server.itemSummary;

import org.springframework.hateoas.EntityModel;

public interface ItemSummaryService {

    public abstract EntityModel<ItemSummary> getItemSummary();
}
