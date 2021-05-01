package com.ims.server.item;

import org.springframework.hateoas.EntityModel;
import org.springframework.stereotype.Component;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@Component
public class ItemModelAssembler implements RepresentationModelAssembler<Item, EntityModel<Item>> {

    @Override
    public EntityModel<Item> toModel(Item item) {
        return EntityModel.of(
                item,
                linkTo(methodOn(ItemController.class).getItem(item.getId())).withSelfRel(),
                linkTo(methodOn(ItemController.class).getItems()).withRel("items")
        );
    }
}
