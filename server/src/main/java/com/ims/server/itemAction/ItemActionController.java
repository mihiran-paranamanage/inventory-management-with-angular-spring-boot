package com.ims.server.itemAction;

import com.ims.server.item.Item;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Objects;
import org.springframework.lang.Nullable;

import com.ims.server.item.ItemRepository;
import com.ims.server.exception.ResourceNotFoundException;

@RestController
@RequestMapping("/api/items/{itemId}")
public class ItemActionController {

    private enum Action {
        ADD,
        UPDATE,
        DELETE
    };

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    ItemActionRepository itemActionRepository;

    @GetMapping("/itemActions")
    public List<ItemAction> getItemActions(@PathVariable Long itemId) {
        return itemRepository.findById(itemId)
                .map(item -> {
                    return itemActionRepository.findByItemId(itemId);
                })
                .orElseThrow(ResourceNotFoundException::new);
    }

    @PostMapping("/itemActions")
    public ItemAction saveItemAction(@PathVariable Long itemId, @RequestBody ItemAction itemAction) {
        return itemRepository.findById(itemId)
                .map(item -> {
                    adjustItemQuantity(Action.ADD, item, itemAction, null);
                    itemAction.setItem(item);
                    return itemActionRepository.save(itemAction);
                })
                .orElseThrow(ResourceNotFoundException::new);
    }

    @GetMapping("/itemActions/{itemActionId}")
    public ItemAction getItemAction(@PathVariable Long itemId, @PathVariable Long itemActionId) {
        return itemActionRepository.findByIdAndItemId(itemActionId, itemId)
                .orElseThrow(ResourceNotFoundException::new);
    }

    @PutMapping("/itemActions/{itemActionId}")
    public ItemAction replaceItemAction(@PathVariable Long itemId, @PathVariable Long itemActionId, @RequestBody ItemAction newItemAction) {
        return itemRepository.findById(itemId)
                .map(item -> {
                    return itemActionRepository.findByIdAndItemId(itemActionId, itemId)
                            .map(itemAction -> {
                                adjustItemQuantity(Action.UPDATE, item, itemAction, newItemAction);
                                itemAction.setPrice(newItemAction.getPrice());
                                itemAction.setQuantity(newItemAction.getQuantity());
                                return itemActionRepository.save(itemAction);
                            })
                            .orElseGet(() -> {
                                adjustItemQuantity(Action.ADD, item, newItemAction, null);
                                newItemAction.setId(itemActionId);
                                return itemActionRepository.save(newItemAction);
                            });
                })
                .orElseThrow(ResourceNotFoundException::new);
    }

    @DeleteMapping("/itemActions/{itemActionId}")
    public ResponseEntity<?> deleteItemAction(@PathVariable Long itemId, @PathVariable Long itemActionId) {
        return itemRepository.findById(itemId)
                .map(item -> {
                    return itemActionRepository.findByIdAndItemId(itemActionId, itemId)
                            .map(itemAction -> {
                                adjustItemQuantity(Action.DELETE, item, itemAction, null);
                                itemActionRepository.deleteById(itemActionId);
                                return ResponseEntity.noContent().build();
                            })
                            .orElseThrow(ResourceNotFoundException::new);
                })
                .orElseThrow(ResourceNotFoundException::new);
    }

    protected void adjustItemQuantity(Action action, Item item, ItemAction itemAction, @Nullable ItemAction newItemAction) {
        Long itemQuantity = item.getQuantity();
        Long itemActionQuantity = itemAction.getQuantity();

        Long newItemActionQuantity;
        if (Objects.isNull(newItemAction)) {
            newItemActionQuantity = 0L;
        } else {
            newItemActionQuantity = newItemAction.getQuantity();
        }

        long totalQuantity = getTotalQuantity(action, itemQuantity, itemActionQuantity, newItemActionQuantity);
        item.setQuantity(totalQuantity);
        itemRepository.save(item);
    }

    protected long getTotalQuantity(Action action, Long itemQuantity, Long itemActionQuantity, Long newItemActionQuantity) {
        long totalQuantity;
        switch(action) {
            case UPDATE:
                totalQuantity = itemQuantity + (newItemActionQuantity - itemActionQuantity);
                break;
            case DELETE:
                totalQuantity = itemQuantity - itemActionQuantity;
                break;
            default:
                totalQuantity = itemQuantity + itemActionQuantity;
        }
        return totalQuantity;
    }
}
