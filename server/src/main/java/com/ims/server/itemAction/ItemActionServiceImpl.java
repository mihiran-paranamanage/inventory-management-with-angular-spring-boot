package com.ims.server.itemAction;

import org.springframework.stereotype.Service;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Objects;
import org.springframework.lang.Nullable;
import javax.transaction.Transactional;

import com.ims.server.item.Item;
import com.ims.server.item.ItemRepository;
import com.ims.server.exception.ResourceNotFoundException;

@Service
public class ItemActionServiceImpl implements ItemActionService {

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    ItemActionRepository itemActionRepository;

    @Autowired
    ItemActionModelAssembler itemActionModelAssembler;

    private enum Action {
        ADD,
        UPDATE,
        DELETE
    };

    @Override
    public CollectionModel<EntityModel<ItemAction>> getItemActions(Long itemId) {
        List<EntityModel<ItemAction>> itemActions = itemRepository.findById(itemId)
                .map(item -> {
                    return itemActionRepository.findByItemId(itemId).stream()
                            .map(itemActionModelAssembler::toModel)
                            .collect(Collectors.toList());
                })
                .orElseThrow(ResourceNotFoundException::new);
        return CollectionModel.of(
                itemActions,
                linkTo(methodOn(ItemActionController.class).getItemActions(itemId)).withSelfRel()
        );
    }

    @Override
    @Transactional
    public ResponseEntity<?> saveItemAction(Long itemId, ItemAction itemAction) {
        ItemAction savedItemAction = itemRepository.findById(itemId)
                .map(item -> {
                    return saveItemActionAndUpdateRelations(item, itemAction);
                })
                .orElseThrow(ResourceNotFoundException::new);
        EntityModel<ItemAction> itemActionModel = itemActionModelAssembler.toModel(savedItemAction);
        return ResponseEntity
                .created(itemActionModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(itemActionModel);
    }

    @Override
    public EntityModel<ItemAction> getItemAction(Long itemId, Long itemActionId) {
        ItemAction itemAction = itemActionRepository.findByIdAndItemId(itemActionId, itemId)
                .orElseThrow(ResourceNotFoundException::new);
        return itemActionModelAssembler.toModel(itemAction);
    }

    @Override
    @Transactional
    public ResponseEntity<?> replaceItemAction(Long itemId, Long itemActionId, ItemAction newItemAction) {
        ItemAction savedItemAction = itemRepository.findById(itemId)
                .map(item -> {
                    return itemActionRepository.findByIdAndItemId(itemActionId, itemId)
                            .map(itemAction -> {
                                return replaceItemActionAndUpdateRelations(item, itemAction, newItemAction);
                            })
                            .orElseGet(() -> {
                                return saveItemActionAndUpdateRelations(item, newItemAction);
                            });
                })
                .orElseThrow(ResourceNotFoundException::new);
        EntityModel<ItemAction> itemActionModel = itemActionModelAssembler.toModel(savedItemAction);
        return ResponseEntity
                .created(itemActionModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(itemActionModel);
    }

    @Override
    @Transactional
    public ResponseEntity<?> deleteItemAction(Long itemId, Long itemActionId) {
        return itemRepository.findById(itemId)
                .map(item -> {
                    return itemActionRepository.findByIdAndItemId(itemActionId, itemId)
                            .map(itemAction -> {
                                return deleteItemActionAndUpdateRelations(item, itemAction);
                            })
                            .orElseThrow(ResourceNotFoundException::new);
                })
                .orElseThrow(ResourceNotFoundException::new);
    }

    protected ItemAction saveItemActionAndUpdateRelations(Item item, ItemAction itemAction) {
        adjustItemQuantity(Action.ADD, item, itemAction, null);
        itemAction.setItem(item);
        return itemActionRepository.save(itemAction);
    }

    protected ItemAction replaceItemActionAndUpdateRelations(Item item, ItemAction itemAction, ItemAction newItemAction) {
        adjustItemQuantity(Action.UPDATE, item, itemAction, newItemAction);
        itemAction.setPrice(newItemAction.getPrice());
        itemAction.setQuantity(newItemAction.getQuantity());
        return itemActionRepository.save(itemAction);
    }

    protected ResponseEntity<?> deleteItemActionAndUpdateRelations(Item item, ItemAction itemAction) {
        adjustItemQuantity(Action.DELETE, item, itemAction, null);
        itemActionRepository.deleteById(itemAction.getId());
        return ResponseEntity.noContent().build();
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
