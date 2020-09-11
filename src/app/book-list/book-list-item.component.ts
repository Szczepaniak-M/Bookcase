import {Component, Input} from '@angular/core';
import {BookModel, BookStatusOption} from './book.model';

@Component({
  selector: 'app-book-list-item',
  template: `
    <div class="list-group-item row">
      <div class="row text-center align-items-center">
        <div class="col-md-3 text-break">{{book.title}}</div>
        <div class="col-md-3 text-break">{{book.author}}</div>

        <div class="col-md-3"> {{book.status}}</div>
        <button class="col-md-3 btn btn-primary" [disabled]="!isBookAvailable()" (click)="onClickAssignMe()">Wypożycz</button>
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
