package com.ims.server.item;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;
import java.util.List;
import java.util.stream.Collectors;

import com.ims.server.exception.ResourceNotFoundException;

@RestController
@RequestMapping("/api")
public class ItemController {

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    ItemModelAssembler itemModelAssembler;

    @GetMapping("/items")
    public CollectionModel<EntityModel<Item>> getItems() {
        List<EntityModel<Item>> items = itemRepository.findAll().stream()
                .map(itemModelAssembler::toModel)
                .collect(Collectors.toList());
        return CollectionModel.of(
                items,
                linkTo(methodOn(ItemController.class).getItems()).withSelfRel()
        );
    }

    @PostMapping("/items")
    public ResponseEntity<?> saveItem(@RequestBody Item item) {
        Item savedItem = itemRepository.save(item);
        EntityModel<Item> itemModel = itemModelAssembler.toModel(savedItem);
        return ResponseEntity
                .created(itemModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(itemModel);
    }

    @GetMapping("/items/{itemId}")
    public EntityModel<Item> getItem(@PathVariable Long itemId) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(ResourceNotFoundException::new);
        return itemModelAssembler.toModel(item);
    }

    @PutMapping("/items/{itemId}")
    public ResponseEntity<?> replaceItem(@PathVariable Long itemId, @RequestBody Item newItem) {
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
                    return itemRepository.save(newItem);
                });
        EntityModel<Item> itemModel = itemModelAssembler.toModel(updatedItem);
        return ResponseEntity
                .created(itemModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(itemModel);
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<?> deleteItem(@PathVariable Long itemId) {
        return itemRepository.findById(itemId)
                .map(item -> {
                    itemRepository.deleteById(itemId);
                    return ResponseEntity.noContent().build();
                })
                .orElseThrow(ResourceNotFoundException::new);
    }
}
