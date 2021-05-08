import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {MenuItem} from '../../interfaces/menu-item';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.sass']
})
export class PageNotFoundComponent implements OnInit {

  // Todo Fetch title and subtitle from the configurations through HTTP Client
  pageNotFoundTitle = 'Page Not Found!';
  pageNotFoundSubTitle = 'Please visit one of the following Urls.';
  menuItems: MenuItem[] = [];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    // Todo Fetch menu items from the configurations through HTTP Client
    this.menuItems = [
      {id: 1, name: 'Item List', routerLink: ['/items'], matIcon: 'view_list'},
      {id: 2, name: 'Add Item', routerLink: ['/items/add'], matIcon: 'playlist_add'},
      {id: 3, name: 'Item History', routerLink: ['/items/history'], matIcon: 'history'}
    ];
  }

  onClick(selection: any): void {
    this.router.navigate(selection.selectedOptions.selected[0]?.value);
  }
}
