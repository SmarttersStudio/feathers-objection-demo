// eslint-disable-next-line no-unused-vars
import Author from './author/author.service';
import Book from './book/book.service';
export default function (app) {
  app.configure(Author);
  app.configure(Book);
};
