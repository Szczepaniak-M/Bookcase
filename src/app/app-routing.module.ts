import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationComponent} from './authentication/authentication.component';
import {BookListComponent} from './book-list/book-list.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import {BookAddComponent} from './book-add/book-add.component';
import {OrderBookComponent} from './order-book/order-book.component';
import {BooksResolverService} from './shared/books-resolver.service';
import {OrdersResolverService} from './shared/orders-resolver.service';
import {AuthenticationGuard} from './authentication/authentication.guard';

const routes: Routes = [
  {path: '', component: BookListComponent, resolve: [BooksResolverService]},
  {path: 'login', component: AuthenticationComponent},
  {path: 'add', canActivate: [AuthenticationGuard], component: BookAddComponent},
  {path: 'order-book', canActivate: [AuthenticationGuard], component: OrderBookComponent, resolve: [OrdersResolverService]},
  {path: 'error', component: ErrorPageComponent, data: {message: 'Page not found!'}},
  {path: '**', redirectTo: '/error'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
