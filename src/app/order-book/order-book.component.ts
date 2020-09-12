import {Component, OnInit} from '@angular/core';
import {BookModel} from '../book-list/book.model';
import {NgForm} from '@angular/forms';
import {DataStorageService} from '../shared/data-storage.service';
import {User} from '../authentication/user.model';
import {BookOrderStatus, OrderBook} from './orderBook.model';

@Component({
  selector: 'app-order-book',
  template: `
    <div class="row justify-content-md-center">
      <div class="col-xs-12 col-md-6 col-md-offset-3">
        <form #orderBookForm="ngForm" (ngSubmit)="onSubmit(orderBookForm)">
          <div class="form-group">
            <label for="title">Tytuł</label>
            <input type="text"
                   class="form-control"
                   id="title"
                   name="title"
                   required
                   [(ngModel)]="book.title"
                   #title="ngModel">
            <div [hidden]="title.valid || title.untouched"
                 class="alert alert-danger">
              Tytuł ksiażki jest wymagany
            </div>
          </div>
          <div class="form-group">
            <label for="author">Autor</label>
            <input type="text"
                   class="form-control"
                   id="author"
                   name="author"
                   required
                   [(ngModel)]="book.author"
                   #author="ngModel">
            <div [hidden]="author.valid || author.untouched"
                 class="alert alert-danger">
              Autor książki jest wymagany
            </div>
          </div>
          <button
            class="btn btn-primary mt-2 mb-4"
            type="submit"
            [disabled]="!orderBookForm.valid"
          >Zamów książkę</button>
        </form>
        <app-order-book-list></app-order-book-list>
      </div>
    </div>
  `,
  styleUrls: ['./order-book.component.scss']
})
export class OrderBookComponent implements OnInit {

  book: BookModel = new BookModel();

  constructor(private dataStorageService: DataStorageService) {
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    console.log(form);
    const title = form.value.title;
    const author = form.value.author;
    const userData: User = JSON.parse(localStorage.getItem('userData'));

    const order: OrderBook = {title, author, status: BookOrderStatus.WAITING, purchaserId: userData.email};
    this.dataStorageService.addOrders(order);
  }
}
