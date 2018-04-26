import { Component, OnInit, Input } from '@angular/core'
import { UserService } from '../user.service'
import { UserModel } from '../user-model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @Input() users: UserModel[]
  @Input() loading: number
  @Input() type: string

  public userFormModalOpened: Boolean = false

  public currentUser: UserModel = null

  constructor(public userService: UserService) { }

  editUser(user) {
    this.currentUser = user
    this.userFormModalOpened = true
  }

  submitUserForm(newUser) {
    if (this.currentUser) this.userService.editUser(newUser)
    this.userFormModalOpened = !this.userFormModalOpened
  }

  ngOnInit() {
  }
}
