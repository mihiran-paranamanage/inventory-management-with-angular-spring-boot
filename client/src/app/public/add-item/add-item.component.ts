import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Location } from '@angular/common';

import {ItemService} from '../../services/item/item.service';
import {SnackbarService} from '../../services/snackbar/snackbar.service';
import {Item} from '../../interfaces/item';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.sass']
})
export class AddItemComponent implements OnInit {

  textInputValidators = [Validators.required, Validators.maxLength(100)];
  currencyInputValidators = [Validators.required, Validators.pattern(/^\d+(.\d{2})?$/)];
  numberInputValidators = [Validators.required, Validators.pattern(/^\d+$/)];

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private itemService: ItemService,
    private snackbarService: SnackbarService
  ) { }

  itemForm = this.formBuilder.group({
    code: ['', this.textInputValidators],
    name: ['', this.textInputValidators],
    cost: ['', this.currencyInputValidators],
    price: ['', this.currencyInputValidators],
    quantity: ['', this.numberInputValidators]
  });

  ngOnInit(): void {
  }

  onAdd(): void {
    const item: Item = this.itemForm.value;
    const url = 'http://localhost:4201/api/items';
    this.itemService.addItem(url, item)
      .subscribe(() => this.snackbarService.openSnackBar('Item Added Successfully!'));
  }

  onCancel(): void {
    this.location.back();
  }
}
