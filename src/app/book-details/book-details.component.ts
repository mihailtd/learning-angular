import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  @Input() book
  @Input() allTags
  @Output() formSubmitEvent: EventEmitter<any> = new EventEmitter();
  @Output() formCancelEvent: EventEmitter<any> = new EventEmitter();

  bookForm: FormGroup

  constructor(private fb: FormBuilder) { }

  createForm() {
    this.bookForm = this.fb.group({
      id: [(this.book ? this.book.id : null), Validators.required],
      title: [(this.book ? this.book.title : null), Validators.required],
      author: [(this.book ? this.book.author : null), Validators.required],
      tags: [(this.book ? this.book.tags.length >= 0 ? this.book.tags : [] : []), Validators.required]
    })
  }

  submit(formData) {
    return this.formSubmitEvent.emit(formData);
  }
 
  cancel() {
    return this.formCancelEvent.emit(null);
  }

  ngOnInit() {
    this.createForm()
  }
}
