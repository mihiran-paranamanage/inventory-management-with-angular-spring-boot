package com.ims.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ims.server.entity.Item;
import com.ims.server.repository.ItemRepository;

@Controller
@RequestMapping(path="/api/items")
public class ItemController {
	@Autowired
	private ItemRepository itemRepository;

	@PostMapping(path="/add")
	public @ResponseBody Item addNewItem (
			@RequestParam String code,
			@RequestParam String name) {

		Item item = new Item();
		item.setCode(code);
		item.setName(name);
		itemRepository.save(item);
		return item;
	}

	@GetMapping(path="/all")
	public @ResponseBody Iterable<Item> getAllItems() {
		return itemRepository.findAll();
	}
}
