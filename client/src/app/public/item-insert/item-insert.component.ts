import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {ItemActionInsertDetailsComponent} from '../item-action-insert-details/item-action-insert-details.component';
import {Item} from '../../interfaces/item';
import {SnackbarService} from '../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-item-insert',
  templateUrl: './item-insert.component.html',
  styleUrls: ['./item-insert.component.sass']
})
export class ItemInsertComponent implements OnInit {

  @Input() item!: Item;
  @Output() inserted =  new EventEmitter();

  constructor(
    private matBottomSheet: MatBottomSheet,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
  }

  onInsert(): void {
    this.matBottomSheet.open(ItemActionInsertDetailsComponent, {
      data: {item: this.item}
    });
  }

  onInserted(item: Item): void {
    this.inserted.emit(item);
    this.snackbarService.openSnackBar('Item Inserted Successfully!');
  }
}
