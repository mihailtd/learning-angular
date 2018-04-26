import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserModel } from '../user-model';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  @Input() user: UserModel
  @Input() editable: Boolean = true
  @Output() editEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
