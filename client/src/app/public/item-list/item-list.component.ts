import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import {Item} from '../../interfaces/item';

const ELEMENT_DATA: Item[] = [
  {id: '1254fads2f1', name: 'Iphone X', price: 32450.90, quantity: 1},
  {id: '1254fads2f2', name: 'Redmi Note 8', price: 1400.00, quantity: 4},
  {id: '1254fads2f3', name: 'Huawei Y9', price: 980.00, quantity: 6},
  {id: '1254fads2f4', name: 'Redmi Note 9', price: 1600.00, quantity: 9},
  {id: '1254fads2f5', name: 'Huawei Y7', price: 16450.00, quantity: 1},
  {id: '1254fads2f6', name: 'Iphone XI', price: 27600.00, quantity: 10},
  {id: '1254fads2f7', name: 'Phone Cover Iphone X', price: 1520.00, quantity: 10},
  {id: '1254fads2f8', name: 'Nokia Battery', price: 16500.50, quantity: 19},
  {id: '1254fads2f9', name: 'Portable Hard Drive', price: 1000.00, quantity: 19},
  {id: '1254fads2f10', name: 'Phone Cover Huawei Y7', price: 400.00, quantity: 21},
  {id: '1254fads2f11', name: 'Hikvision CCTV', price: 11700.00, quantity: 29},
  {id: '1254fads2f12', name: 'Phone Charger Redmi Note 9', price: 250.00, quantity: 2},
  {id: '1254fads2f13', name: 'Phone Cover Huawei Y9', price: 125000.00, quantity: 29},
  {id: '1254fads2f14', name: 'Power Bank Huawei 20000', price: 300.00, quantity: 20},
  {id: '1254fads2f15', name: 'Power Bank Huawei 5000', price: 14600.00, quantity: 39},
  {id: '1254fads2f16', name: 'Phone Cover Redmi Note 9', price: 1700.00, quantity: 3},
  {id: '1254fads2f17', name: 'Power Bank Huawei 10000', price: 150.00, quantity: 3},
  {id: '1254fads2f18', name: 'Phone Cover Redmi Note 8', price: 21600.00, quantity: 3},
  {id: '1254fads2f19', name: 'Phone Charger Redmi Note 8', price: 4500.00, quantity: 30},
  {id: '1254fads2f20', name: 'Headset Samsung', price: 12750.00, quantity: 4},
];

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.sass']
})
export class ItemListComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'price', 'quantity', 'actions'];
  dataSource = new MatTableDataSource<Item>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
