import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { BookModel, tags } from './book-model'
import { UserService } from './user.service';
import { UserModel } from './user-model';

@Injectable()
export class LibraryService {
  books: BookModel[]
  cotacts: UserModel[] = this.userService.getContactList()
  
  tags = tags

  constructor(private http: HttpClient, private userService: UserService) { }

  addBookToLibrary(book) {
    this.books.push(book)
    this.resetBooks(this.books)
  }

  addUserToBook(users: UserModel[], book: BookModel) {
    book.users = users
    this.editBook(book)
  }

  removeUserFromBook(user: UserModel, book: BookModel) {
    book.users = book.users.filter(u => u.login.username !== user.login.username)
    this.editBook(book)
  }
  getAllBooks() {
    return this.http.get('../assets/books.json').toPromise()
  }

  resetBooks(newBooks) {
    this.books = newBooks
    sessionStorage.setItem('books', JSON.stringify(newBooks))
  }

  editBook(newBook: BookModel) {
    const newBooks = this.books.map((book: BookModel) => {
      if (book.id === newBook.id) {
        return newBook
      } else return book
    })

    this.resetBooks(newBooks)
  }

  async refetchBooks() {
    let existingBooks = JSON.parse(sessionStorage.getItem('books'))
    if (existingBooks) {
      this.resetBooks(existingBooks)
    } else {
      let books: BookModel[] = await this.getAllBooks() as any
      this.resetBooks(books)
    }
  }
}
