import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {ItemService} from '../../services/item/item.service';
import {SnackbarService} from '../../services/snackbar/snackbar.service';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {Item} from '../../interfaces/item';
import {ItemAction} from '../../interfaces/itemAction';

@Component({
  selector: 'app-item-action-sell-details',
  templateUrl: './item-action-sell-details.component.html',
  styleUrls: ['./item-action-sell-details.component.sass']
})
export class ItemActionSellDetailsComponent implements OnInit {

  itemAction: ItemAction = {
    price: 0,
    quantity: 0,
  };

  textInputValidators = [Validators.required, Validators.maxLength(100)];
  currencyInputValidators = [Validators.required, Validators.pattern(/^\d+(.\d{2})?$/)];
  numberInputValidators = [Validators.required, Validators.pattern(/^\d+$/)];

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private itemService: ItemService,
    private matBottomSheetRef: MatBottomSheetRef<ItemActionSellDetailsComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {item: Item}
  ) { }

  itemForm = this.formBuilder.group({
    code: [this.data.item.code, this.textInputValidators],
    name: [this.data.item.name, this.textInputValidators],
    cost: [this.data.item.cost, this.currencyInputValidators],
    price: [this.data.item.price, this.currencyInputValidators],
    quantity: ['', this.numberInputValidators]
  });

  ngOnInit(): void {
  }

  onSell(): void {
    const item: Item = this.itemForm.value;
    const url = 'http://localhost:4201/api/items/' + this.data.item.id + '/itemActions';
    this.itemAction.price = item.price;
    this.itemAction.quantity = -item.quantity;
    this.itemService.addItemAction(url, this.itemAction)
      .subscribe(() => this.onSold());
  }

  onSold(): void {
    this.matBottomSheetRef.dismiss();
  }

  onCancel(): void {
    this.matBottomSheetRef.dismiss();
  }
}
