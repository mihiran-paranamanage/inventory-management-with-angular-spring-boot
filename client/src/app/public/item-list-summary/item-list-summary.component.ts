import { Component, OnInit } from '@angular/core';
import { LkrCurrencyPipe } from '../../pipes/lkr-currency.pipe'

import {Tile} from '../../interfaces/tile';

@Component({
  selector: 'app-item-list-summary',
  templateUrl: './item-list-summary.component.html',
  styleUrls: ['./item-list-summary.component.sass']
})
export class ItemListSummaryComponent implements OnInit {

  constructor(
    private lkrCurrencyPipe: LkrCurrencyPipe
  ) { }

  ngOnInit(): void {
  }

  tiles: Tile[] = [
    {text: 'Daily Profit', cols: 2, rows: 2, backgroundColor: 'lightgray', color: '#000'},
    {text: 'Number of Items Sold', cols: 2, rows: 2, backgroundColor: 'lightgray', color: '#000'},
    {text: this.lkrCurrencyPipe.transform(1200), cols: 2, rows: 2, backgroundColor: 'lightgray', color: 'red'},
    {text: '25', cols: 2, rows: 2, backgroundColor: 'lightgray', color: 'red'}
  ];
}
