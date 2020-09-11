import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BookListItemComponent} from './book-list/book-list-item.component';
import {BookListComponent} from './book-list/book-list.component';
import {NavbarComponent} from './navbar/navbar.component';
import {AuthenticationComponent} from './authentication/authentication.component';
import {FormsModule} from '@angular/forms';
import {BookAddComponent} from './book-add/book-add.component';
import {LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';
import {HttpClientModule} from '@angular/common/http';
import {BookListFilterComponent} from './book-list/book-list-filter.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { OrderBookComponent } from './order-book/order-book.component';
import { OrderBookListComponent } from './order-book/order-book-list/order-book-list.component';
import { OrderBookListItemComponent } from './order-book/order-book-list-item/order-book-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BookListItemComponent,
    BookListComponent,
    BookListFilterComponent,
    BookAddComponent,
    BookListFilterComponent,
    NavbarComponent,
    AuthenticationComponent,
    LoadingSpinnerComponent,
    ErrorPageComponent,
    OrderBookComponent,
    OrderBookListComponent,
    OrderBookListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
