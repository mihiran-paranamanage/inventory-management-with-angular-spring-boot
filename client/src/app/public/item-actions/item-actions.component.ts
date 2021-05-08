import {Component, Input, OnInit} from '@angular/core';

import {Item} from '../../interfaces/item';

@Component({
  selector: 'app-item-actions',
  templateUrl: './item-actions.component.html',
  styleUrls: ['./item-actions.component.sass']
})
export class ItemActionsComponent implements OnInit {

  @Input() item!: Item;

  constructor() { }

  ngOnInit(): void {
  }
}
