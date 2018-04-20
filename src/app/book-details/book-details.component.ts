import { Component, OnInit, Input } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { BookModel, tags } from '../book-model';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  @Input() book

  tags

  bookForm: FormGroup

  constructor(private fb: FormBuilder) {
    this.tags = tags
  }

  createForm() {
    if (!this.book) return
    this.bookForm = this.fb.group({
      id: this.book.id || null,
      title: this.book.title || null,
      author: this.book.author || null,
      tags: this.book.tags.length >= 0 ? this.book.tags : [],
      users: this.book.users.length >= 0 ? this.book.users : []
    })
  }

  ngOnInit() {
    this.createForm()
  }
}
