import { Component, OnInit } from '@angular/core'
import { LibraryService } from '../library.service'

import { BookModel, tags } from '../book-model'

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  activeTab: String = 'all'
  books: BookModel[]
  search: String = ''

  constructor(public libraryService: LibraryService) { }

  changeActiveTab(activeTab) {
    this.search = ''
    this.activeTab = activeTab
    this.books = this.getBooksForTag(activeTab)
  }

  searchBook(event: any) {
    this.search = event.target.value
    this.books = this.getBookByTitle(event.target.value)
  }

  getBookByTitle(title: String) {
    if (!title) {
      return this.getBooksForTag(this.activeTab)
    }
    return this.books.filter(book => {
      return book.title.toUpperCase().indexOf(title.toUpperCase()) >= 0
    })
  }

  getBooksForTag(tag: String) {
    if (!tag || tag.toUpperCase() === 'ALL') return this.libraryService.books
    return this.libraryService.books.filter(book => {
      return book.tags.map(tag => tag.toUpperCase()).includes(tag.toUpperCase())
    })
  }

  ngOnInit() {
    this.libraryService.refetchBooks().then(() => {
      this.books = this.getBooksForTag(this.activeTab)
    })
  }
}
