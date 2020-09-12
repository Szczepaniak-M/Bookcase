import {Injectable} from '@angular/core';
import {BookModel, BookStatusOption} from './book.model';
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
    this.booksList = books ? books : [];
    this.booksListChanged.next(this.booksList.slice());
  }

  getBooks(): BookModel[] {
    return this.booksList.slice();
  }

  addOwner(bookO: BookModel, email: string): void {
    const updatedBook = this.booksList.slice().filter(book => book.author === bookO.author && book.title === book.title)[0];
    const id = this.booksList.indexOf(updatedBook);
    updatedBook.owner = email;
    updatedBook.status = BookStatusOption.RENTAL;
    this.booksList[id] = updatedBook;
    console.log(this.booksList[id]);
    this.booksListChanged.next(this.booksList.slice());
  }

  deleteOwner(bookO: BookModel): void {
    const updatedBook = this.booksList.slice().filter(book => book.author === bookO.author && book.title === book.title)[0];
    const id = this.booksList.indexOf(updatedBook);
    updatedBook.owner = '';
    updatedBook.status = BookStatusOption.AVAILABLE;
    this.booksList[id] = updatedBook;
    console.log(this.booksList[id]);
    this.booksListChanged.next(this.booksList.slice());
  }
}
