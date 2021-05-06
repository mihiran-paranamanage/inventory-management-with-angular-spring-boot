import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ItemService} from '../../services/item/item.service';
import {SnackbarService} from '../../services/snackbar/snackbar.service';
import {Item} from '../../interfaces/item';

@Component({
  selector: 'app-item-delete',
  templateUrl: './item-delete.component.html',
  styleUrls: ['./item-delete.component.sass']
})
export class ItemDeleteComponent implements OnInit {

  @Input() item!: Item;
  @Output() deleted =  new EventEmitter();

  constructor(
    private itemService: ItemService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
  }

  onDelete(item: Item): void {
    const url = 'http://localhost:4201/api/items/' + item.id;
    this.itemService.deleteItem(url)
      .subscribe(() => this.onDeleted(item));
  }

  onDeleted(item: Item): void {
    this.deleted.emit(item);
    this.snackbarService.openSnackBar('Item Deleted Successfully!');
  }
}
