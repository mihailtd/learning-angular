import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BookModel } from '../book-model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  @Input() book: BookModel
  @Input() users: BookModel
  @Output() editBookEvent: EventEmitter<any> = new EventEmitter();
  @Output() addUserToBookEvent: EventEmitter<any> = new EventEmitter();
  @Output() removeUserFromBookEvent: EventEmitter<any> = new EventEmitter();
  
  public showRecycelBin: Boolean = false
  private panelOpenState: Boolean = false

  constructor() { }

  dragUser(type) {
    if(type === 'dragstart') {
      this.showRecycelBin = true
    } else {
      this.showRecycelBin = false
    }
  }

  editBook(event: Event, book) {
    event.stopImmediatePropagation()
    this.editBookEvent.emit(book)
  }

  addUserToBook(dragData: {user: Object, book: Object}) {
    this.addUserToBookEvent.emit(dragData)
  }

  removeUserFromBook(dragData: {user: Object, book: Object}) {
    this.removeUserFromBookEvent.emit(dragData)
    this.showRecycelBin = false
  }

  ngOnInit() {
  }

}
