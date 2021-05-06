import {Component, Inject, OnInit} from '@angular/core';
import {Item} from '../../interfaces/item';
import {FormBuilder, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {ItemService} from '../../services/item/item.service';
import {SnackbarService} from '../../services/snackbar/snackbar.service';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-item-action-update-details',
  templateUrl: './item-action-update-details.component.html',
  styleUrls: ['./item-action-update-details.component.sass']
})
export class ItemActionUpdateDetailsComponent implements OnInit {

  textInputValidators = [Validators.required, Validators.maxLength(100)];
  currencyInputValidators = [Validators.required, Validators.pattern(/^\d+(.\d{2})?$/)];
  numberInputValidators = [Validators.required, Validators.pattern(/^\d+$/)];

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private itemService: ItemService,
    private snackbarService: SnackbarService,
    private matBottomSheetRef: MatBottomSheetRef<ItemActionUpdateDetailsComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {item: Item}
  ) { }

  itemForm = this.formBuilder.group({
    code: [this.data.item.code, this.textInputValidators],
    name: [this.data.item.name, this.textInputValidators],
    cost: [this.data.item.cost, this.currencyInputValidators],
    price: [this.data.item.price, this.currencyInputValidators],
    quantity: [this.data.item.quantity, this.numberInputValidators]
  });

  ngOnInit(): void {
  }

  onUpdate(): void {
    const item: Item = this.itemForm.value;
    const url = 'http://localhost:4201/api/items/' + this.data.item.id;
    this.itemService.updateItem(url, item)
      .subscribe(() => this.onUpdated());
  }

  onUpdated(): void {
    this.matBottomSheetRef.dismiss();
  }

  onCancel($event: MouseEvent): void {
    this.matBottomSheetRef.dismiss();
    $event.preventDefault();
  }
}
