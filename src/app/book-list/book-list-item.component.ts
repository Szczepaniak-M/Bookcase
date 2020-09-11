import {Component, Input} from '@angular/core';
import {BookModel, BookStatusOption} from './book.model';
import {BookService} from "../book-add/book.service";

@Component({
  selector: 'app-book-list-item',
  template: `
    <div class="list-group-item row">
      <div class="row text-center align-items-center">
        <div class="col-md-3 text-break">{{book.title}}</div>
        <div class="col-md-3 text-break">{{book.author}}</div>

        <div class="col-md-3"> {{book.status}}</div>
        <div class="col-md-3">
          <button class="btn btn-primary" *ngIf="isBookAvailable()" (click)="onClickAssignMe()">Wypożycz</button>
          <button class="btn btn-primary" *ngIf="!isBookAvailable() && isCurrentUserOwner()" (click)="onClickUnassignMe()">Oddaj</button>
          <p *ngIf="!isBookAvailable() && !isCurrentUserOwner()"> {{ book.owner }}</p>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['book-list-item.component.scss']
})
export class BookListItemComponent {
  @Input() book: BookModel;

  constructor(private bookService: BookService) {
  }

  onClickAssignMe(): void {
    this.bookService.addBookOwner(this.book.id);
  }

  onClickUnassignMe(): void {
    this.bookService.deleteBookOwner(this.book.id);
  }

  isBookAvailable(): boolean {
    return this.book.status === BookStatusOption.AVAILABLE;
  }

  isCurrentUserOwner(): boolean {
    const user = JSON.parse(localStorage.getItem('userData'));
    return user.id === this.book.ownerId;
  }
}
