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

  constructor(public libraryService: LibraryService) { }

  changeActiveTab(activeTab) {
    this.activeTab = activeTab
    this.books = this.getBooksForTag(activeTab)
  }

  searchBookByTitle(title: any) {
    if (title && title.target && title.target.value) {
      this.books = this.books.filter(book => {
        return book.title.toUpperCase().indexOf(title.target.value.toUpperCase()) >= 0
      })
    } else if (title.target.value === '') {
      this.books = this.getBooksForTag(this.activeTab)
      return
    }
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
