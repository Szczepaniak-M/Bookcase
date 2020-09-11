import {BookModel} from '../book-list/book.model';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {DataStorageService} from './data-storage.service';
import {BookListService} from '../book-list/book-list.service';

@Injectable({providedIn: 'root'})
export class BooksResolverService implements Resolve<BookModel[]> {
  constructor(private dataStorageService: DataStorageService,
              private bookListService: BookListService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BookModel[]> | Promise<BookModel[]> | BookModel[] {
    const books = this.bookListService.getBooks();

    if (books.length === 0) {
      return this.dataStorageService.fetchBooks();
    } else {
      return books;
    }
  }

}
