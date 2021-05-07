package com.ims.server.itemAction;

import org.springframework.hateoas.EntityModel;
import org.springframework.stereotype.Component;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import com.ims.server.item.ItemController;

@Component
public class ItemActionModelAssembler implements RepresentationModelAssembler<ItemAction, EntityModel<ItemAction>> {

    @Override
    public EntityModel<ItemAction> toModel(ItemAction itemAction) {
        return EntityModel.of(
                itemAction,
                linkTo(methodOn(ItemActionController.class).getItemAction(itemAction.getItem().getId(), itemAction.getId())).withSelfRel(),
                linkTo(methodOn(ItemController.class).getItems()).withRel("items"),
                linkTo(methodOn(ItemActionController.class).getItemActions(itemAction.getItem().getId())).withRel("itemActions")
        );
    }
}
