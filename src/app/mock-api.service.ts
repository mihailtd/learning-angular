import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from './user-model';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MockApiService {
  private usersUrl = 'https://randomuser.me/api/?results=15'

  constructor(private http: HttpClient) { }

  getCurrentUser(): UserModel {
    return JSON.parse(sessionStorage.getItem('user'))
  }

  saveCurrentUser(user: UserModel) {
    sessionStorage.setItem('user', JSON.stringify(user))
  }

  isCurrentUser(): boolean {
    return JSON.parse(sessionStorage.getItem('user')) !== null
  }

}
