import { Component, OnInit } from '@angular/core'
import { UserService } from '../user.service'
import { UserModel } from '../user-model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  public users: Object
  public loading: number = 0
  constructor(private userService: UserService) { }

  private async getUsers() {
    this.loading +=1
    const users = await this.userService.getUsers() as any
    this.users = users.results
    this.loading -= 1
  }

  ngOnInit() {
    this.getUsers()
  }

}
