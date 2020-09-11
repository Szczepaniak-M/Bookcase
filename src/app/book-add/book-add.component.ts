import {Component, OnInit, ViewChild} from '@angular/core';
import {BookService} from './book.service';
import {BookModel} from '../book-list/book.model';

@Component({
  selector: 'app-book-add',
  templateUrl: 'book-add.component.html',
  styleUrls: ['book-add.component.scss']
})
export class BookAddComponent {
  constructor(private bookAddService: BookService) {

  }
  book: BookModel = new BookModel();


  onSubmit($event: BookModel): void {
    this.bookAddService.addNewBook($event);
  }
}
