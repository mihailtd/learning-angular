import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserModel } from '../user-model';
import { LibraryService } from '../library.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public currentUser: Observable<UserModel>
  public isEditUser: boolean = !this.userService.isCurrentUser()
  public genders: String[] = this.userService.genders

  constructor(private userService: UserService, private libraryService: LibraryService) { }

  saveCurrentUser(user) {
    this.userService.saveCurrentUser(user)
    this.isEditUser = !this.userService.isCurrentUser()
  }

  ngOnInit() {
    this.userService.getCurrentUser()
    this.currentUser = this.userService.currentUser
    this.libraryService.refetchBooks()
  }

}
