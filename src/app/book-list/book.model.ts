export class BookModel {
  title: string;
  author: string;
  publicationYear: string;
  status: BookStatusOption;
  owner?: string;
}

export enum BookStatusOption {
  AVAILABLE = 'Dostępna',
  RENTAL = 'Wypożyczona',
  ALL = 'Wszystkie'
}

export const BOOK_STATUS: BookStatusOption[] = [BookStatusOption.AVAILABLE, BookStatusOption.RENTAL, BookStatusOption.ALL];

export class BookFilter {
  data?: string;
  status?: BookStatusOption;
}



