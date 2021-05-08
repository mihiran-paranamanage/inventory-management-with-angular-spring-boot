import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  // Todo Fetch title and icon from the configurations through HTTP Client
  navbarMatIcon = 'phonelink';
  navbarTitle = 'SASIKA MOBILE';

  constructor() { }

  ngOnInit(): void {
  }

}
