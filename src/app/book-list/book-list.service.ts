import {Injectable} from '@angular/core';
import {BookModel} from './book.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookListService {

  booksListChanged = new Subject<BookModel[]>();
  private booksList: BookModel[] = [];

  constructor() {
  }

  setBooks(books: BookModel[]): void {
    this.booksList = books;
    console.log(this.booksList);
    // debugger;
    this.booksListChanged.next(this.booksList.slice());
  }

  getBooks(): BookModel[] {
    return this.booksList.slice();
  }
}
