import { Injectable } from '@angular/core';
import {Observable, ObservableInput, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';

import {Item} from '../../interfaces/item';
import {ItemAction} from '../../interfaces/item-action';
import {ItemSummary} from '../../interfaces/item-summary';
import {ItemsResponse} from '../../interfaces/items-response';
import {ItemEventListenerService} from '../item-event-listener/item-event-listener.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(
    private http: HttpClient,
    private itemEventListenerService: ItemEventListenerService
  ) { }

  getItems(url: string): Observable<Item[]> {
    return this.http.get<ItemsResponse>(url)
      .pipe(
        map(response => response._embedded.itemList),
        catchError(error => this.handleError(error))
      );
  }

  addItem(url: string, item: Item): Observable<Item> {
    return this.http.post<Item>(url, item)
      .pipe(
        tap(response => this.itemEventListenerService.onAdded(item)),
        catchError(error => this.handleError(error))
      );
  }

  getItem(url: string): Observable<Item> {
    return this.http.get<Item>(url)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  updateItem(url: string, item: Item): Observable<Item> {
    return this.http.put<Item>(url, item)
      .pipe(
        tap(response => this.itemEventListenerService.onUpdated(item)),
        catchError(error => this.handleError(error))
      );
  }

  deleteItem(url: string): Observable<{}> {
    return this.http.delete<{}>(url)
      .pipe(
        tap(response => this.itemEventListenerService.onDeleted()),
        catchError(error => this.handleError(error))
      );
  }

  sellItem(url: string, itemAction: ItemAction): Observable<ItemAction> {
    return this.http.post<ItemAction>(url, itemAction)
      .pipe(
        tap(response => this.itemEventListenerService.onSold(itemAction)),
        catchError(error => this.handleError(error))
      );
  }

  insertItem(url: string, itemAction: ItemAction): Observable<ItemAction> {
    return this.http.post<ItemAction>(url, itemAction)
      .pipe(
        tap(response => this.itemEventListenerService.onInserted(itemAction)),
        catchError(error => this.handleError(error))
      );
  }

  getItemSummary(url: string): Observable<ItemSummary> {
    return this.http.get<ItemSummary>(url)
      .pipe(
        map(response => response),
        catchError(error => this.handleError(error))
      );
  }

  handleError(error: any): ObservableInput<any> {
    console.log(error);
    this.itemEventListenerService.onFailure(error);
    return of([]);
  }
}
