import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

import {Item} from '../../interfaces/item';
import {ItemAction} from '../../interfaces/itemAction';

interface ItemsResponse {
  _embedded: {
    itemList: Item[];
    _links: {self: {href: string}};
  };
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(
    private http: HttpClient,
  ) { }

  getItems(url: string): Observable<Item[]> {
    return this.http.get<ItemsResponse>(url)
      .pipe(
        map(response => response._embedded.itemList)
      );
  }

  addItem(url: string, item: Item): Observable<Item> {
    return this.http.post<Item>(url, item);
  }

  getItem(url: string): Observable<Item> {
    return this.http.get<Item>(url);
  }

  updateItem(url: string, item: Item): Observable<Item> {
    return this.http.put<Item>(url, item);
  }

  deleteItem(url: string): Observable<{}> {
    return this.http.delete<{}>(url);
  }

  addItemAction(url: string, itemAction: ItemAction): Observable<ItemAction> {
    return this.http.post<ItemAction>(url, itemAction);
  }
}
