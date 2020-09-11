import {Component, OnInit} from '@angular/core';
import {BookFilter, BookModel, BookStatusOption} from './book.model';
import {BookListService} from './book-list.service';

@Component({
  selector: 'app-book-list',
  template: `
    <div class="book-list-wrapper">
      <app-book-list-filter (filterChanged)="onFilterChange($event)"></app-book-list-filter>
      <div
        class="book-list"
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
      {id: 2, title: 'test2', author: 'Test Testowy', publicationYear: '2006', status: BookStatusOption.RENTAL}];
    this.visibleBooks = this.allBooksList;
  }

  onFilterChange($event: BookFilter): void {
    this.visibleBooks = this.allBooksList.filter(book => this.filterBooks(book, $event));
  }

  private filterBooks(book: BookModel, filter: BookFilter): boolean {
    if (filter.title && !book.title.includes(filter.title)){
      return false;
    }

    if (filter.author && !book.author.includes(filter.author)){
      return false;
    }

    return filter.status === BookStatusOption.ALL || filter.status === book.status;
  }
}
