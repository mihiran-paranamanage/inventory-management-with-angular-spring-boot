package com.ims.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.PathVariable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.ims.server.entity.ItemAction;
import com.ims.server.repository.ItemActionRepository;

@Controller
@RequestMapping(path="/api/item/{itemId}/itemActions")
public class ItemActionController {
	@Autowired
	private ItemActionRepository itemActionRepository;

	@PostMapping(path="/add")
	public @ResponseBody ItemAction addNewItemAction (
			@PathVariable("itemId") Integer itemId,
			@RequestParam BigDecimal cost,
			@RequestParam BigDecimal price,
			@RequestParam Integer quantity) {

		ItemAction itemAction = new ItemAction();
		itemAction.setItemId(itemId);
		itemAction.setCost(cost);
		itemAction.setPrice(price);
		itemAction.setQuantity(quantity);
		itemAction.setDateTime(LocalDateTime.now());
		itemActionRepository.save(itemAction);
		return itemAction;
	}

	@GetMapping(path="/all")
	public @ResponseBody Iterable<ItemAction> getAllItemActions() {
		return itemActionRepository.findAll();
	}
}
