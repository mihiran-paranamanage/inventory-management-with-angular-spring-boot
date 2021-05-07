import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {ItemActionSellDetailsComponent} from '../item-action-sell-details/item-action-sell-details.component';
import {Item} from '../../interfaces/item';
import {SnackbarService} from '../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-item-sell',
  templateUrl: './item-sell.component.html',
  styleUrls: ['./item-sell.component.sass']
})
export class ItemSellComponent implements OnInit {

  @Input() item!: Item;
  @Output() sold =  new EventEmitter();

  constructor(
    private matBottomSheet: MatBottomSheet,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
  }

  onSell(): void {
    this.matBottomSheet.open(ItemActionSellDetailsComponent, {
      data: {item: this.item}
    });
  }

  onSold(item: Item): void {
    this.sold.emit(item);
    this.snackbarService.openSnackBar('Item Sold Successfully!');
  }
}
