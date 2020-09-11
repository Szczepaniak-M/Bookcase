import {Component, Input} from '@angular/core';
import {BookModel, BookStatusOption} from './book.model';

@Component({
  selector: 'app-book-list-item',
  template: `
    <div class="item-wrapper">
      <div>
        <div class="title">{{book.title}}</div>
        <div class="author">{{book.author}}</div>
      </div>
      <div>
        <div class="status"> {{book.status}}</div>
        <button *ngIf="isBookAvailable()" (click)="onClickAssignMe()">Wypożycz</button>
      </div>
    </div>
  `,
  styleUrls: ['book-list-item.component.scss']
})
export class BookListItemComponent {
  @Input() book: BookModel;

  onClickAssignMe(): void {
    // todo
  }

  isBookAvailable(): boolean {
    return this.book.status === BookStatusOption.AVAILABLE;
  }
}
