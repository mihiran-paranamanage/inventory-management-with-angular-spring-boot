import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ItemListComponent } from './public/item-list/item-list.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ItemListSummaryComponent } from './public/item-list-summary/item-list-summary.component';
import { ItemsComponent } from './public/items/items.component';
import { ItemSoldBtnComponent } from './public/item-sold-btn/item-sold-btn.component';
import { SidenavMenuItemsComponent } from './shared/sidenav-menu-items/sidenav-menu-items.component';
import { AddItemComponent } from './public/add-item/add-item.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    NavbarComponent,
    ItemListSummaryComponent,
    ItemsComponent,
    ItemSoldBtnComponent,
    SidenavMenuItemsComponent,
    AddItemComponent,
    PageNotFoundComponent
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MatToolbarModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatFormFieldModule,
      MatInputModule,
      MatCardModule,
      MatDividerModule,
      MatGridListModule,
      MatButtonModule,
      MatSnackBarModule,
      MatSidenavModule,
      MatListModule,
      MatIconModule,
      ReactiveFormsModule,
      HttpClientModule
    ],
  providers: [
    CurrencyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
