import { Component, OnInit } from '@angular/core'
import { UserService } from '../user.service'

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  public loading: number = 0

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.userService.getContactList()
  }
}
