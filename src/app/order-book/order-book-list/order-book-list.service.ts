import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {OrderBook} from '../orderBook.model';
import {User} from '../../authentication/user.model';

@Injectable({
  providedIn: 'root'
})
export class OrderBookListService {

  orderBooksListChanged = new Subject<OrderBook[]>();
  private orderBookList: OrderBook[] = [];

  constructor() {
  }

  setOrders(orders: OrderBook[]): void {
    const userData: User = JSON.parse(localStorage.getItem('userData'));
    this.orderBookList = orders.filter(order => order.purchaserId === userData.email);
    this.orderBooksListChanged.next(this.orderBookList.slice());
  }

  getOrders(): OrderBook[] {
    return this.orderBookList.slice();
  }
}
