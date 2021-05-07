package com.ims.server.itemAction;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.CollectionModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/items/{itemId}")
public class ItemActionController {

    @Autowired
    ItemActionService itemActionService;

    @GetMapping("/itemActions")
    public CollectionModel<EntityModel<ItemAction>> getItemActions(@PathVariable Long itemId) {
        return itemActionService.getItemActions(itemId);
    }

    @PostMapping("/itemActions")
    public ResponseEntity<?> saveItemAction(@PathVariable Long itemId, @RequestBody ItemAction itemAction) {
        return itemActionService.saveItemAction(itemId, itemAction);
    }

    @GetMapping("/itemActions/{itemActionId}")
    public EntityModel<ItemAction> getItemAction(@PathVariable Long itemId, @PathVariable Long itemActionId) {
        return itemActionService.getItemAction(itemId, itemActionId);
    }

    @PutMapping("/itemActions/{itemActionId}")
    public ResponseEntity<?> replaceItemAction(@PathVariable Long itemId, @PathVariable Long itemActionId, @RequestBody ItemAction newItemAction) {
        return itemActionService.replaceItemAction(itemId, itemActionId, newItemAction);
    }

    @DeleteMapping("/itemActions/{itemActionId}")
    public ResponseEntity<?> deleteItemAction(@PathVariable Long itemId, @PathVariable Long itemActionId) {
        return itemActionService.deleteItemAction(itemId, itemActionId);
    }
}
