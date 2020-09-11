import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BookModel} from '../book-list/book.model';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private httpClient: HttpClient) {
  }

  addNewBook(book: BookModel): Observable<BookModel> {
    return this.httpClient.post<BookModel>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
      book
    ).pipe();
  }

  addBookOwner(bookId: number): Observable<BookModel> {
    const user = JSON.parse(localStorage.getItem('userData'));
    return this.httpClient.patch<BookModel>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
      {id: bookId, owner: user.id}
    ).pipe();
  }

  deleteBookOwner(bookId: number): Observable<BookModel> {
    const user = JSON.parse(localStorage.getItem('userData'));
    return this.httpClient.patch<BookModel>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
      {id: bookId, owner: user.id}
    ).pipe();
  }
}
