export class BookModel {
  id: number;
  title: string;
  author: string;
  publicationYear: string;
  status: BookStatusOption;
}

export enum BookStatusOption {
  AVAILABLE = 'Dostępna',
  RENTAL = 'Wypożyczona',
  ALL = 'Wszystkie'
}

export const BOOK_STATUS: BookStatusOption[] = [BookStatusOption.AVAILABLE, BookStatusOption.RENTAL, BookStatusOption.ALL];

export class BookFilter {
  title?: string;
  author?: string;
  status?: BookStatusOption;
}



