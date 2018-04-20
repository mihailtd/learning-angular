import { Component, OnInit, Input } from '@angular/core'
import { UserService } from '../user.service'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @Input() users: string
  @Input() type: string
  editModalOpened = false
  currentUser

  constructor(public userService: UserService) { }

  editUser(user) {
    this.currentUser = user
    this.editModalOpened = true
  }

  ngOnInit() { }
}
