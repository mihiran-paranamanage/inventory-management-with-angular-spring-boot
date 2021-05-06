import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ItemService} from '../../services/item/item.service';

import {Item} from '../../interfaces/item';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.sass']
})
export class ItemListComponent implements AfterViewInit {

  private items: Item[] = [];
  dataSource = new MatTableDataSource<Item>(this.items);
  displayedColumns: string[] = ['code', 'name', 'cost', 'price', 'quantity', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private itemService: ItemService,
  ) {
  }

  ngAfterViewInit(): void {
    const url = 'http://localhost:4201/api/items';
    this.itemService.getItems(url)
      .subscribe(items => this.updateTableDataSource(items));
  }

  updateTableDataSource(items: Item[]): void {
    this.items = items;
    this.dataSource = new MatTableDataSource<Item>(items);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDeleted(item: Item): void {
    this.items = this.items.filter(h => h !== item);
    this.updateTableDataSource(this.items);
  }

  onInserted(item: Item): void {
    this.updateTableDataSource(this.items);
  }

  onSold(item: Item): void {
    this.updateTableDataSource(this.items);
  }
}
