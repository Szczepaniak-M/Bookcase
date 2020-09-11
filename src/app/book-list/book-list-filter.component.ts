import {Component, EventEmitter, Output} from '@angular/core';
import {BOOK_STATUS, BookFilter, BookStatusOption} from './book.model';

@Component({
  selector: 'app-book-list-filter',
  template: `
    <div class="row justify-content-md-center">
      <div class="col-xs-12 col-md-8 col-md-offset-3 form-group">
        <input class="form-control"
               type="text"
               id="book-list-search"
               placeholder="Szukaj"
               #inputRef="ngModel"
               (ngModelChange)="onSearch($event)"
               [ngModel]="bookFilter.data">
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

  onSearch($event: string): void {
    this.bookFilter.data = $event;
    this.filterChanged.emit(this.bookFilter);
  }

  onStatusChange($event: BookStatusOption): void {
    this.bookFilter.status = $event;
    this.filterChanged.emit(this.bookFilter);
  }

}
