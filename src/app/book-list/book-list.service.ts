import {Injectable} from '@angular/core';
import {BookModel} from './book.model';

@Injectable({
  providedIn: 'root'
})
export class BookListService {

  constructor() {
  }
  // @ts-ignore
  getBookList(): BookModel[] {
  }
}
