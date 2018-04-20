import { Component, OnInit, Input } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { UserModel, genders } from '../user-model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  @Input() user
  // deafultUser: UserModel = {
  //   email: null,
  //   gender: null,
  //   dob: null,
  //   login: {
  //     password: null,
  //     username: null
  //   }
  // }
  genders

  userForm: FormGroup

  constructor(private fb: FormBuilder) {
    this.genders = genders
  }

  createForm() {
    if (!this.user) return
    this.userForm = this.fb.group({
      email: this.user.email || null,
      gender: new String(this.user.gender) || null,
      username: this.user.login.username || null,
      password: this.user.login.password || null,
      dob: this.user.dob.substring(0, 10)
    })
  }

  ngOnInit() {
    this.createForm()
  }
}
