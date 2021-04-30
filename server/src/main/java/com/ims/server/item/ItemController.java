package com.ims.server.item;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

import com.ims.server.exception.ResourceNotFoundException;

@RestController
@RequestMapping("/api")
public class ItemController {

    @Autowired
    ItemRepository itemRepository;

    @GetMapping("/items")
    public List<Item> getItems() {
        return itemRepository.findAll();
    }

    @PostMapping("/items")
    public Item saveItem(@RequestBody Item item) {
        return itemRepository.save(item);
    }

    @GetMapping("/items/{itemId}")
    public Item getItem(@PathVariable Long itemId) {
        return itemRepository.findById(itemId)
                .orElseThrow(ResourceNotFoundException::new);
    }

    @PutMapping("/items/{itemId}")
    public Item replaceItem(@PathVariable Long itemId, @RequestBody Item newItem) {
        return itemRepository.findById(itemId)
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
