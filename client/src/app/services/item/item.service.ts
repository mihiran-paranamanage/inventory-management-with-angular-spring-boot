import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {Item} from '../../interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(
    private http: HttpClient,
  ) { }

  getItems(url: string): Observable<Item[]> {
    return this.http.get<Item[]>(url);
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
}
