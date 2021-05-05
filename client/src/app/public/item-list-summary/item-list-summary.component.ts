import { Component, OnInit } from '@angular/core';

import {Tile} from '../../interfaces/tile';

@Component({
  selector: 'app-item-list-summary',
  templateUrl: './item-list-summary.component.html',
  styleUrls: ['./item-list-summary.component.sass']
})
export class ItemListSummaryComponent implements OnInit {

  tiles: Tile[] = [
    {text: 'Daily Profit', cols: 2, rows: 2, backgroundColor: 'lightgray', color: '#000'},
    {text: 'Number of Items Sold', cols: 2, rows: 2, backgroundColor: 'lightgray', color: '#000'},
    {text: '1200', cols: 2, rows: 2, backgroundColor: 'lightgray', color: 'red'},
    {text: '25', cols: 2, rows: 2, backgroundColor: 'lightgray', color: 'red'}
  ];

  ngOnInit(): void {
  }
}
