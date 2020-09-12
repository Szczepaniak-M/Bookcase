import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BookModel} from '../book-list/book.model';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {BookListService} from '../book-list/book-list.service';
import {OrderBook} from '../order-book/orderBook.model';
import {OrderBookListService} from '../order-book/order-book-list/order-book-list.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private bookListService: BookListService,
    private orderBookListService: OrderBookListService
  ) {
  }

  fetchBooks(): Observable<BookModel[]> {
    return this.http.get<BookModel[]>(
      'https://bookcase-3077b.firebaseio.com/books.json'
    )
      .pipe(tap(books => {
          console.log(books);
          this.bookListService.setBooks(books);
        })
      );
  }

  addBook(newBook: BookModel): void {
    const booksList = this.bookListService.getBooks();
    booksList.push(newBook);
    console.log(booksList);
    this.http.put(
      'https://bookcase-3077b.firebaseio.com/books.json',
      booksList
    )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchOrders(): Observable<OrderBook[]> {
    return this.http.get<OrderBook[]>(
      'https://bookcase-3077b.firebaseio.com/orders.json'
    )
      .pipe(tap(orders => {
          console.log(orders);
          this.orderBookListService.setOrders(orders);
        })
      );
  }

  addOrders(orderedBook: OrderBook): void {
    const ordersBook = this.orderBookListService.getOrders();
    ordersBook.push(orderedBook);
    this.http.put(
      'https://bookcase-3077b.firebaseio.com/orders.json',
      ordersBook
    )
      .subscribe(response => {
        console.log(response);
      });
  }

  addBookOwner(book: BookModel, email: string): Observable<BookModel> {
    // return this.http.patch<BookModel>(
    //   'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
    //   { owner: user.id} //todo
    // ).pipe();
  }

  deleteBookOwner(book: BookModel): Observable<BookModel> {
    // const user = JSON.parse(localStorage.getItem('userData'));
    // return this.http.patch<BookModel>(
    //   'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
    //   {owner: null} //todo
    // ).pipe();
  }
}
