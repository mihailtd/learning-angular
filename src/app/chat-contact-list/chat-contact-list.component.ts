import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from '../user-model';

@Component({
  selector: 'app-chat-contact-list',
  templateUrl: './chat-contact-list.component.html',
  styleUrls: ['./chat-contact-list.component.css']
})
export class ChatContactListComponent implements OnInit {
  @Input() users: UserModel

  constructor() { }

  ngOnInit() {
  }

}
