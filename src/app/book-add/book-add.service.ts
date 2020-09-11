import {Injectable} from '@angular/core';
import {BookModel} from '../book-list/book.model';
import {DataStorageService} from '../shared/data-storage.service';
import {BookListService} from '../book-list/book-list.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private dataStorageService: DataStorageService, private bookListService: BookListService) {
  }

  addNewBook(book: BookModel): void {
    this.dataStorageService.addBook(book, this.bookListService.getBooks());
  }
}
