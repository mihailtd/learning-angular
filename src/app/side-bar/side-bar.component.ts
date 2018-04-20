import { Component, OnInit } from '@angular/core'
import { UserService } from '../user.service'

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  users
  constructor(private userService: UserService) { }

  async getUsers() {
    let response = await this.userService.getUsers() as any
    this.userService.users = response.results
  }

  ngOnInit() {
    this.getUsers()
  }

}
