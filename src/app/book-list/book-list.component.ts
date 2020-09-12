import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookFilter, BookModel, BookStatusOption} from './book.model';
import {BookListService} from './book-list.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-book-list',
  template: `
    <div class="container mt-4">
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
        *ngFor="let book of visibleBooks;">
        <app-book-list-item
          [book]="book"
        ></app-book-list-item>
      </div>
    </div>
  `,
  styleUrls: ['book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {

  private allBooksList: BookModel[] = [];
  visibleBooks: BookModel[] = [];
  subscription: Subscription;

  constructor(private bookListService: BookListService) {
  }

  ngOnInit(): void {
    this.subscription = this.bookListService.booksListChanged.subscribe((books: BookModel[]) => {
      this.allBooksList = books;
      this.visibleBooks = books;
    });
    this.allBooksList = this.bookListService.getBooks();
    this.visibleBooks = this.allBooksList.slice();
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
