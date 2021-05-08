package com.ims.server.itemSummary;

import com.ims.server.itemAction.ItemAction;
import com.ims.server.itemAction.ItemActionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ItemSummaryServiceImpl implements ItemSummaryService {

    @Autowired
    ItemActionRepository itemActionRepository;

    @Autowired
    ItemSummaryModelAssembler itemSummaryModelAssembler;

    @Override
    public EntityModel<ItemSummary> getItemSummary() {
        LocalDateTime startDate = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
        LocalDateTime endDate = LocalDateTime.now().withHour(23).withMinute(59).withSecond(59);
        List<ItemAction> itemActions = itemActionRepository.findByCreatedDateBetween(startDate, endDate);

        ItemSummary itemSummary = getCalculatedItemSummary(itemActions);
        return itemSummaryModelAssembler.toModel(itemSummary);
    }

    private ItemSummary getCalculatedItemSummary(List<ItemAction> itemActions) {
        ItemSummary itemSummary = new ItemSummary();
        BigDecimal dailyProfit = BigDecimal.ZERO;
        Long soldCount = 0L;
        Long insertedCount = 0L;

        for (ItemAction itemAction : itemActions) {

            BigDecimal quantity = new BigDecimal(itemAction.getQuantity());
            if (quantity.compareTo(BigDecimal.ZERO) > 0) {
                insertedCount = insertedCount + quantity.longValue();
            } else {
                soldCount = soldCount + quantity.negate().longValue();
            }

            BigDecimal itemProfit = itemAction.getPrice().subtract(itemAction.getItem().getCost());
            BigDecimal itemActionProfit = itemProfit.multiply(quantity.negate());
            dailyProfit = dailyProfit.add(itemActionProfit);
        }

        itemSummary.setDailyProfit(dailyProfit);
        itemSummary.setSoldCount(soldCount);
        itemSummary.setInsertedCount(insertedCount);
        return itemSummary;
    }
}
