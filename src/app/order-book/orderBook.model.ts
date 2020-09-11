import {BookStatusOption} from '../book-list/book.model';

export enum BookOrderStatus {
  WAITING = 'Oczekuje',
  IN_BOOKCASE = 'Na półce'
}

export class OrderBook {
  title: string;
  author: string;
  status: BookOrderStatus;
}
