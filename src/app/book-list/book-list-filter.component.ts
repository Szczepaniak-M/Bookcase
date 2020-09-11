import {Component, EventEmitter, Output} from '@angular/core';
import {BOOK_STATUS, BookFilter, BookStatusOption} from './book.model';

@Component({
  selector: 'app-book-list-filter',
  template: `
    <div class="book-list-filter">
      <div class="form-group">
        <input type="text"
               id="book-list-search"
               placeholder="Szukaj po tytule"
               #inputRef="ngModel"
               (ngModelChange)="onTitleSearchValueChange($event)"
               [ngModel]="bookFilter.title">
        <input type="text"
               id="book-list-search"
               placeholder="Szukaj po autorze"
               #inputRef="ngModel"
               (ngModelChange)="onAuthorSearchValueChange($event)"
               [ngModel]="bookFilter.author">
        <label for="status-combo">Dostępność</label>
        <select id="status-combo"
                class="form-control"
                [ngModel]="bookFilter.status"
                (ngModelChange)="onStatusChange($event)">
          <option *ngFor=" let status of bookStatusOption;">{{status}}</option>
        </select>
      </div>
    </div>
  `,
  styleUrls: ['book-list-filter.component.scss']
})
export class BookListFilterComponent {
  @Output() filterChanged: EventEmitter<BookFilter> = new EventEmitter<BookFilter>();
  bookFilter: BookFilter = {status: BookStatusOption.ALL};
  bookStatusOption: BookStatusOption[] = BOOK_STATUS;

  onTitleSearchValueChange($event: string): void {
    this.bookFilter.title = $event;
    this.filterChanged.emit(this.bookFilter);
  }

  onAuthorSearchValueChange($event: string): void {
    this.bookFilter.author = $event;
    this.filterChanged.emit(this.bookFilter);
  }

  onStatusChange($event: BookStatusOption): void {
    this.bookFilter.status = $event;
    this.filterChanged.emit(this.bookFilter);
  }

}
