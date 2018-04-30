import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { UserModel, genders } from '../user-model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  @Input() user: UserModel;
  @Input() genders: String[];
  @Output() formSubmitEvent: EventEmitter<any> = new EventEmitter();
  @Output() formCancelEvent: EventEmitter<any> = new EventEmitter();

  userForm: FormGroup

  constructor(private fb: FormBuilder) { }

  createForm() {
    this.userForm = this.fb.group({
      email: [(this.user ? this.user.email : null), Validators.required],
      gender: [(this.user ? this.user.gender : genders[0])],
      login: this.fb.group({
        username: [{value: ( (this.user && this.user.login) ? this.user.login.username : null), disabled: this.user}, Validators.required],
        password: [( (this.user && this.user.login) ? this.user.login.password : null), Validators.required],
      }),
      picture: this.fb.group({
        thumbnail: [(this.user && this.user.picture) ? this.user.picture.thumbnail : '']
      }),
      dob: [(this.user ? new Date(this.user.dob) : null)]
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
