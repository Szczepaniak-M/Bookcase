import {Component, Input, OnInit} from '@angular/core';
import {OrderBook} from '../orderBook.model';

@Component({
  selector: 'app-order-book-list-item',
  template: `
    <div class="list-group-item row">
      <div class="row text-center align-items-center">
        <div class="col-md-4 text-break">{{book.title}}</div>
        <div class="col-md-4 text-break">{{book.author}}</div>

        <div class="col-md-4"> {{book.status}}</div>
      </div>
    </div>
  `,
  styleUrls: ['./order-book-list-item.component.scss']
})
export class OrderBookListItemComponent implements OnInit {
  @Input() book: OrderBook;

  constructor() {
  }

  ngOnInit(): void {
  }

}
