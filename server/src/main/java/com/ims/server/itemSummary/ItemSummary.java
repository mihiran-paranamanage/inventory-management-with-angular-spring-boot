package com.ims.server.itemSummary;

import lombok.Data;
import java.time.LocalDate;
import java.math.BigDecimal;

@Data
public class ItemSummary {

	private BigDecimal dailyProfit;

	private Long soldCount;

	private Long insertedCount;

	private LocalDate date;

	ItemSummary() {
		this.dailyProfit = BigDecimal.ZERO;
		this.soldCount = 0L;
		this.insertedCount = 0L;
		this.date = LocalDate.now();
	}
}
