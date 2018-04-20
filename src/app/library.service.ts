import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { BookModel, tags } from './book-model'

@Injectable()
export class LibraryService {
  books: BookModel[]

  constructor(private http: HttpClient) { }

  getAllBooks() {
    return new Promise((resolve, reject) => {
      this.http.get('../assets/books.json')
        .toPromise()
        .then(res => {
          return resolve(res)
        }, err => reject(err))
    })
  }

  editBook(book) {}

  addBookToLibrary(book) {}

  addUserToBook(user, book) {}

  async refetchBooks() {
    this.books = await this.getAllBooks() as any
  }
}
