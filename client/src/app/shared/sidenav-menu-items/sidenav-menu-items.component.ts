import { Component, OnInit } from '@angular/core';

import {MenuItem} from '../../interfaces/menu-item';

@Component({
  selector: 'app-sidenav-menu-items',
  templateUrl: './sidenav-menu-items.component.html',
  styleUrls: ['./sidenav-menu-items.component.sass']
})
export class SidenavMenuItemsComponent implements OnInit {

  menuItems: MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {
    // Todo Fetch menu items from the configurations through HTTP Client
    this.menuItems = [
      {id: 1, name: 'Item List', routerLink: ['/items'], matIcon: 'view_list'},
      {id: 2, name: 'Add Item', routerLink: ['/items/add'], matIcon: 'playlist_add'},
      {id: 3, name: 'Item History', routerLink: ['/items/history'], matIcon: 'history'}
    ];
  }
}
