import {Component} from '@angular/core';
import {BookModel, BookStatusOption} from '../book-list/book.model';
import {NgForm} from '@angular/forms';
import {DataStorageService} from '../shared/data-storage.service';

@Component({
  selector: 'app-book-add',
  template: `
    <div class="form-wrapper">
      <form #bookForm="ngForm" (ngSubmit)="onSubmit(bookForm)">
        <div class="form-group">
          <label for="title">Tytuł</label>
          <input type="text"
                 class="form-control"
                 id="title"
                 name="title"
                 required
                 [(ngModel)]="book.title"
                 #title="ngModel">
          <div [hidden]="title.invalid || title.untouched"
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
          <div [hidden]="author.invalid || author.untouched"
               class="alert alert-danger">
            Autor książki jest wymagany
          </div>
        </div>

        <div class="form-group">
          <label for="publicationYear">Rok wydania</label>
          <input type="text"
                 class="form-control"
                 id="publicationYear"
                 required
                 [(ngModel)]="book.publicationYear"
                 name="publicationYear"
                 #publicationYear="ngModel">
          <div [hidden]="publicationYear.valid || publicationYear.untouched"
               class="alert alert-danger">
            Rok wydania książki jest wymaany
          </div>
        </div>
        <button type="submit" class="btn btn-success" [disabled]="!bookForm.form.valid">Dodaj</button>
      </form>
    </div>`,
  styleUrls: ['book-add.component.scss']
})
export class BookAddComponent {
  constructor(private dataStorageService: DataStorageService) {

  }

  book: BookModel = new BookModel();

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }
    const title = form.value.title;
    const author = form.value.author;
    const publicationYear = form.value.publicationYear;

    const book: BookModel = {
      title,
      author,
      publicationYear,
      status: BookStatusOption.AVAILABLE,
      owner: null
    };
    this.dataStorageService.addBook(book);
    form.reset();
  }
}
