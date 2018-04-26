import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { FormControl } from '@angular/forms';
import {MatDialog} from '@angular/material';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { LibraryService } from '../library.service';

import { BookModel, tags } from '../book-model';
import { UserService } from '../user.service';
import { UserModel } from '../user-model';
import { ContactSelectComponent } from '../contact-select/contact-select.component';


@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  private searchSub: Subscription
  public search = new FormControl()
  public books: BookModel[]
  public loading: number = 0;
  public currentBook: BookModel
  public editModalOpened: Boolean = false
  public contacts: UserModel[] = this.libraryService.cotacts
  public allTags: any[] = this.libraryService.tags
  private activeTab: String = 'all'

  constructor(public libraryService: LibraryService, public dialog: MatDialog) { }

  changeActiveTab(activeTab) {
    this.activeTab = activeTab
    this.books = this.getBooksForTag(activeTab)
  }

  searchBook(query: string) {
    this.books = this.getBookByTitle(query)
  }

  getBookByTitle(title: String) {
    if (!title) {
      return this.getBooksForTag(this.activeTab)
    }
    return this.getBooksForTag(this.activeTab).filter(book => {
      return book.title.toUpperCase().indexOf(title.toUpperCase()) >= 0
    })
  }

  getBooksForTag(tag: String) {
    if (!tag || tag.toUpperCase() === 'ALL') return this.libraryService.books
    return this.libraryService.books.filter(book => {
      return book.tags.map(tag => tag.toUpperCase()).includes(tag.toUpperCase())
    })
  }

  openBookFormModal(book: BookModel) {
    this.currentBook = book
    this.editModalOpened = !this.editModalOpened
  }

  openAddUserToBookDialog(contacts: UserModel[], book: BookModel) {
    const dialogRef = this.dialog.open(ContactSelectComponent, {
      height: '350px',
      width: '600px',
      data: { contacts: contacts, users: book.users }
    })

    dialogRef.afterClosed().subscribe((users: UserModel[]) => {
      if(!users) return
      this.libraryService.addUserToBook(users, book)
    })
  }

  submitBookForm(book) {
    this.loading += 1
    if (this.currentBook) {
      this.libraryService.editBook(book)
    } else {
      this.libraryService.addBookToLibrary(book)
    }
    this.loading -= 1
    this.editModalOpened = !this.editModalOpened

    this.books = this.getBooksForTag(this.activeTab)
  }

  removeUserFromBook(data: {user: UserModel, book: BookModel}) {
    let { user: user, book: book } = data
    this.libraryService.removeUserFromBook(user, book)
  }

  ngOnInit() {
    this.searchSub = this.search.valueChanges
      .debounceTime(500)
      .subscribe(newValue => {
        this.searchBook(newValue)
      })

    this.libraryService.refetchBooks().then(() => {
      this.books = this.getBooksForTag(this.activeTab)
    })
  }

  ngOnDestroy() {
    this.searchSub.unsubscribe();
  }
}
