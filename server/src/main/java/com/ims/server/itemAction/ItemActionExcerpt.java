package com.ims.server.itemAction;

import java.math.BigDecimal;
import org.springframework.data.rest.core.config.Projection;

import com.ims.server.item.Item;

@Projection(name = "itemActionExcerpt", types = ItemAction.class)
interface ItemActionExcerpt {

    Long getId();

    BigDecimal getPrice();

    Long getQuantity();

    Item getItem();
}
