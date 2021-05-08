import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {Item} from '../../interfaces/item';
import {ItemService} from '../../services/item/item.service';
import {ItemActionDeleteConfirmationComponent} from '../item-action-delete-confirmation/item-action-delete-confirmation.component';

@Component({
  selector: 'app-item-delete',
  templateUrl: './item-delete.component.html',
  styleUrls: ['./item-delete.component.sass']
})
export class ItemDeleteComponent implements OnInit {

  @Input() item!: Item;

  constructor(
    private itemService: ItemService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  onDelete(item: Item): void {
    const dialogRef = this.matDialog.open(ItemActionDeleteConfirmationComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Todo Use HATEOAS Urls
        const url = 'http://localhost:4201/api/items/' + item.id;
        this.itemService.deleteItem(url)
          .subscribe();
      }
    });
  }
}
