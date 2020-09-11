import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {DataStorageService} from './data-storage.service';
import {OrderBookListService} from '../order-book/order-book-list/order-book-list.service';
import {OrderBook} from '../order-book/orderBook.model';

@Injectable({providedIn: 'root'})
export class OrdersResolverService implements Resolve<OrderBook[]> {
  constructor(private dataStorageService: DataStorageService,
              private orderBookListService: OrderBookListService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OrderBook[]> | Promise<OrderBook[]> | OrderBook[] {
    const orders = this.orderBookListService.getOrders();
    if (orders.length === 0) {
      return this.dataStorageService.fetchOrders();
    } else {
      return orders;
    }
  }

}
