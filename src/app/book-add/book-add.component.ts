import {Component} from '@angular/core';
import {BookAddService} from './book-add.service';
import {BookModel} from '../book-list/book.model';

@Component({
  selector: 'app-book-add',
  templateUrl: 'book-add.component.html',
  styleUrls: ['book-add.component.scss']
})
export class BookAddComponent {
  constructor(private bookAddService: BookAddService) {
  }

  book: BookModel = new BookModel();


  onSubmit($event: BookModel): void {
    this.bookAddService.addNewBook($event);
  }
}
