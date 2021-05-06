import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from '../../interfaces/item';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {SnackbarService} from '../../services/snackbar/snackbar.service';
import {ItemActionUpdateDetailsComponent} from '../item-action-update-details/item-action-update-details.component';

@Component({
  selector: 'app-item-update',
  templateUrl: './item-update.component.html',
  styleUrls: ['./item-update.component.sass']
})
export class ItemUpdateComponent implements OnInit {

  @Input() item!: Item;
  @Output() updated =  new EventEmitter();

  constructor(
    private matBottomSheet: MatBottomSheet,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
  }

  onUpdate(): void {
    this.matBottomSheet.open(ItemActionUpdateDetailsComponent, {
      data: {item: this.item}
    });
  }

  onUpdated(item: Item): void {
    this.updated.emit(item);
    this.snackbarService.openSnackBar('Item Updated Successfully!');
  }
}
