import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

import {Item} from '../../interfaces/item';
import {ItemAction} from '../../interfaces/item-action';

@Injectable({
  providedIn: 'root'
})
export class ItemEventListenerService {

  private itemEventSellInputSource = new Subject<Item>();
  private itemEventInsertInputSource = new Subject<Item>();
  private itemEventUpdateInputSource = new Subject<Item>();
  private itemEventDeleteInputSource = new Subject<Item>();
  private itemEventAddInputSource = new Subject<Item>();

  private itemEventSellEmitSource = new Subject<ItemAction>();
  private itemEventInsertEmitSource = new Subject<ItemAction>();
  private itemEventUpdateEmitSource = new Subject<Item>();
  private itemEventDeleteEmitSource = new Subject<any>();
  private itemEventAddEmitSource = new Subject<Item>();

  private itemEventFailureEmitSource = new Subject<any>();

  itemEventSellInput$ = this.itemEventSellInputSource.asObservable();
  itemEventInsertInput$ = this.itemEventInsertInputSource.asObservable();
  itemEventUpdateInput$ = this.itemEventUpdateInputSource.asObservable();
  itemEventDeleteInput$ = this.itemEventDeleteInputSource.asObservable();
  itemEventAddInput$ = this.itemEventAddInputSource.asObservable();

  itemEventSellEmit$ = this.itemEventSellEmitSource.asObservable();
  itemEventInsertEmit$ = this.itemEventInsertEmitSource.asObservable();
  itemEventUpdateEmit$ = this.itemEventUpdateEmitSource.asObservable();
  itemEventDeleteEmit$ = this.itemEventDeleteEmitSource.asObservable();
  itemEventAddEmit$ = this.itemEventAddEmitSource.asObservable();

  itemEventFailureEmit$ = this.itemEventFailureEmitSource.asObservable();

  constructor() { }

  onSell(item: Item): void {
    this.itemEventSellInputSource.next(item);
  }

  onSold(itemAction: ItemAction): void {
    this.itemEventSellEmitSource.next(itemAction);
  }

  onInsert(item: Item): void {
    this.itemEventInsertInputSource.next(item);
  }

  onInserted(itemAction: ItemAction): void {
    this.itemEventInsertEmitSource.next(itemAction);
  }

  onUpdate(item: Item): void {
    this.itemEventUpdateInputSource.next(item);
  }

  onUpdated(item: Item): void {
    this.itemEventUpdateEmitSource.next(item);
  }

  onDelete(item: Item): void {
    this.itemEventDeleteInputSource.next();
  }

  onDeleted(): void {
    this.itemEventDeleteEmitSource.next();
  }

  onAdd(item: Item): void {
    this.itemEventAddInputSource.next(item);
  }

  onAdded(item: Item): void {
    this.itemEventAddEmitSource.next(item);
  }

  onFailure(error: any): void {
    this.itemEventFailureEmitSource.next(error);
  }
}
