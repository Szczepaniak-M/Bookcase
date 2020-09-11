import {Component, OnInit} from '@angular/core';
import {BookOrderStatus, OrderBook} from '../orderBook.model';

@Component({
  selector: 'app-order-book-list',
  template: `
    <div class="container">
      <div class="list-group-item row bg-secondary">
        <div class="row text-center align-items-center">
          <div class="col-md-4 font-weight-bold">Tytuł</div>
          <div class="col-md-4 font-weight-bold">Autor</div>
          <div class="col-md-4 font-weight-bold">Status</div>
        </div>
      </div>
      <div
        class="list-group"
        *ngFor=" let book of orderedBooks;">
        <app-order-book-list-item
          [book]="book"
        ></app-order-book-list-item>
      </div>
    </div>
  `,
  styleUrls: ['./order-book-list.component.scss']
})
export class OrderBookListComponent implements OnInit {

  orderedBooks: OrderBook[];
  constructor() {
  }

  ngOnInit(): void {
    this.orderedBooks = [
      {
        author: 'Ja sam',
        title: 'Trollo',
        status: BookOrderStatus.WAITING
      }
    ];
  }

}
