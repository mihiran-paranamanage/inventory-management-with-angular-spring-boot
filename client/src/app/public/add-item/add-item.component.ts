import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

import {ItemService} from '../../services/item/item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.sass']
})
export class AddItemComponent implements OnInit {

  itemActionTitle = 'Add Item';
  submitButtonLabel = 'Add';

  constructor(
    private formBuilder: FormBuilder,
    private itemService: ItemService
  ) { }

  textInputValidators = [Validators.required, Validators.maxLength(100)];
  currencyInputValidators = [Validators.required, Validators.pattern(/^\d+(.\d{2})?$/)];
  numberInputValidators = [Validators.required, Validators.pattern(/^\d+$/)];

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
    // Todo Use HATEOAS Urls
    const url = 'http://localhost:4201/api/items';
    this.itemService.insertItem(url, this.itemForm.value)
      .subscribe();
  }
}
