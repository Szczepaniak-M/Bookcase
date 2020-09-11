import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BookListItemComponent} from './book-list/book-list-item.component';
import {BookListComponent} from './book-list/book-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import {BookListFilterComponent} from './book-list/book-list-filter.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BookListItemComponent,
    BookListComponent,
    BookListFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
