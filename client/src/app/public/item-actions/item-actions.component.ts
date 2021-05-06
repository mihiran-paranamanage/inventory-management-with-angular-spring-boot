import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Item} from '../../interfaces/item';

@Component({
  selector: 'app-item-actions',
  templateUrl: './item-actions.component.html',
  styleUrls: ['./item-actions.component.sass']
})
export class ItemActionsComponent implements OnInit {

  @Input() item!: Item;
  @Output() deleted =  new EventEmitter();
  @Output() inserted =  new EventEmitter();
  @Output() sold =  new EventEmitter();
  @Output() updated =  new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onDeleted(item: Item): void {
    this.deleted.emit(item);
  }

  onInserted(item: Item): void {
    this.inserted.emit(item);
  }

  onSold(item: Item): void {
    this.sold.emit(item);
  }

  onUpdate(item: Item): void {
    this.updated.emit(item);
  }
}
