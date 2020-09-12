import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderBook} from '../orderBook.model';
import {Subscription} from 'rxjs';
import {OrderBookListService} from './order-book-list.service';

@Component({
  selector: 'app-order-book-list',
  template: `
    <div class="container">
      <div class="list-group-item row bg-secondary rounded-top">
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
export class OrderBookListComponent implements OnInit, OnDestroy {

  orderedBooks: OrderBook[];
  subscription: Subscription;

  constructor(private orderBookListService: OrderBookListService) {
  }

  ngOnInit(): void {
    this.subscription = this.orderBookListService.orderBooksListChanged.subscribe(orders => this.orderedBooks = orders);
    this.orderedBooks = this.orderBookListService.getOrders();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
