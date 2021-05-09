package com.ims.server.item;

import com.ims.server.exception.ResourceUniqueViolationException;
import org.springframework.stereotype.Service;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.transaction.Transactional;

import com.ims.server.itemAction.ItemActionRepository;
import com.ims.server.exception.ResourceNotFoundException;

@Service
public class ItemServiceImpl implements ItemService {

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    ItemActionRepository itemActionRepository;

    @Autowired
    ItemModelAssembler itemModelAssembler;

    @Override
    public CollectionModel<EntityModel<Item>> getItems() {
        List<EntityModel<Item>> items = itemRepository.findAll().stream()
                .map(itemModelAssembler::toModel)
                .collect(Collectors.toList());
        return CollectionModel.of(
                items,
                linkTo(methodOn(ItemController.class).getItems()).withSelfRel()
        );
    }

    @Override
    public ResponseEntity<?> saveItem(Item item) {
        Item savedItem = saveNewItem(item);
        EntityModel<Item> itemModel = itemModelAssembler.toModel(savedItem);
        return ResponseEntity
                .created(itemModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(itemModel);
    }

    @Override
    public EntityModel<Item> getItem(Long itemId) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(ResourceNotFoundException::new);
        return itemModelAssembler.toModel(item);
    }

    @Override
    public ResponseEntity<?> replaceItem(Long itemId, Item newItem) {
        Item updatedItem = itemRepository.findById(itemId)
                .map(item -> {
                    item.setCode(newItem.getCode());
                    item.setName(newItem.getName());
                    item.setCost(newItem.getCost());
                    item.setPrice(newItem.getPrice());
                    item.setQuantity(newItem.getQuantity());
                    return itemRepository.save(item);
                })
                .orElseGet(() -> {
                    newItem.setId(itemId);
                    return saveNewItem(newItem);
                });
        EntityModel<Item> itemModel = itemModelAssembler.toModel(updatedItem);
        return ResponseEntity
                .created(itemModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(itemModel);
    }

    @Override
    @Transactional
    public ResponseEntity<?> deleteItem(Long itemId) {
        return itemRepository.findById(itemId)
                .map(item -> {
                    deleteItemWithRelatedItemActions(item);
                    return ResponseEntity.noContent().build();
                })
                .orElseThrow(ResourceNotFoundException::new);
    }

    protected Item saveNewItem(Item item) throws ResourceUniqueViolationException {
        Optional<Item> duplicateItem = itemRepository.findByCode(item.getCode());
        if (duplicateItem.isEmpty()) {
            return itemRepository.save(item);
        } else {
            throw new ResourceUniqueViolationException();
        }
    }

    protected void deleteItemWithRelatedItemActions(Item item) {
        itemActionRepository.deleteAllByItem(item);
        itemRepository.deleteById(item.getId());
    }
}
