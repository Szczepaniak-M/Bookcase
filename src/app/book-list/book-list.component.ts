import {Component, OnInit} from '@angular/core';
import {BookFilter, BookModel, BookStatusOption} from './book.model';
import {BookListService} from './book-list.service';

@Component({
  selector: 'app-book-list',
  template: `
    <div class="container">
      <app-book-list-filter (filterChanged)="onFilterChange($event)"></app-book-list-filter>
      <div class="list-group-item row bg-secondary">
        <div class="row text-center align-items-center">
          <div class="col-md-3 font-weight-bold">Tytuł</div>
          <div class="col-md-3 font-weight-bold">Autor</div>
          <div class="col-md-3 font-weight-bold">Status</div>
          <div class="col-md-3 font-weight-bold">Wypożycz</div>
        </div>
      </div>
      <div
        class="list-group"
        *ngFor=" let book of visibleBooks;">
        <app-book-list-item
          [book]="book"
        ></app-book-list-item>
      </div>
    </div>
  `,
  styleUrls: ['book-list.component.scss']
})
export class BookListComponent implements OnInit {

  constructor(private bookListService: BookListService) {
  }

  private allBooksList: BookModel[];
  visibleBooks: BookModel[];

  ngOnInit(): void {
    this.allBooksList = this.bookListService.getBookList();
    this.allBooksList = [{
      id: 1,
      title: 'test',
      author: 'Test Testowy',
      publicationYear: '2006',
      status: BookStatusOption.AVAILABLE
    },
      {id: 2, title: 'test2', author: 'xDxDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDdDD', publicationYear: '2006', status: BookStatusOption.RENTAL}];
    this.visibleBooks = this.allBooksList;
  }

  onFilterChange($event: BookFilter): void {
    this.visibleBooks = this.allBooksList.filter(book => this.filterBooks(book, $event));
  }

  private filterBooks(book: BookModel, filter: BookFilter): boolean {
    if (filter.data && !book.title.includes(filter.data) && !book.author.includes(filter.data)) {
      return false;
    }

    return filter.status === BookStatusOption.ALL || filter.status === book.status;
  }
}
