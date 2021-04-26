package com.ims.server.item;

import java.math.BigDecimal;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "itemExcerpt", types = Item.class)
interface ItemExcerpt {

    Long getId();

    String getCode();

    String getName();

    BigDecimal getCost();

    BigDecimal getPrice();

    Long getQuantity();
}
