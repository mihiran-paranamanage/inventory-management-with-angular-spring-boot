import {Component, Input, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

import {Item} from '../../interfaces/item';
import {ItemAction} from '../../interfaces/item-action';
import {ItemService} from '../../services/item/item.service';
import {ItemDetailsFormComponent} from '../item-details-form/item-details-form.component';

@Component({
  selector: 'app-item-sell',
  templateUrl: './item-sell.component.html',
  styleUrls: ['./item-sell.component.sass']
})
export class ItemSellComponent implements OnInit {

  @Input() item!: Item;

  constructor(
    private matDialog: MatDialog,
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
  }

  onSell(): void {
    const dialogRef = this.openDialog();
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sellItem(result);
      }
    });
  }

  private openDialog(): MatDialogRef<any> {
    const item: Item = Object.assign({}, this.item);
    item.quantity = undefined;
    return this.matDialog.open(ItemDetailsFormComponent, {
      data: {
        item,
        itemActionTitle: 'Sell Item',
        submitButtonLabel: 'Sell',
        readonlyFields: {
          code: true,
          name: true,
          cost: true,
          price: false,
          quantity: false
        }
      }
    });
  }

  private sellItem(result: Item): void {
    // Todo Use HATEOAS Urls
    const url = 'http://localhost:4201/api/items/' + this.item.id + '/itemActions';
    const itemAction: ItemAction = {
      id: undefined,
      price: result.price ? result.price : 0,
      quantity: result.quantity ? -result.quantity : 0
    };
    this.itemService.sellItem(url, itemAction)
      .subscribe();
  }
}
