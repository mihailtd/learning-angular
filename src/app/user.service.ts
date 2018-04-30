import { Subject } from 'rxjs/Subject'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { UserModel, genders } from './user-model';
import { ObserveOnOperator } from 'rxjs/operators/observeOn';
import { MockApiService } from './mock-api.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserService {
  private usersUrl = 'https://randomuser.me/api/?results=15'
  private _currentUser: BehaviorSubject<UserModel>
  private dataStore: {
    currentUser: UserModel
  }
  public users: Object[] = []
  public genders: String[] = genders
  public contacts: Object[] = this.getContactList() || []

  constructor(private http: HttpClient, private api: MockApiService) {
    this._currentUser = <BehaviorSubject<UserModel>>new BehaviorSubject({})
    this.dataStore = {
      currentUser: {
        dob: null,
        email: null,
        gender: 'unspecified',
        login: {
          username: null,
          password: null
        },
        picture: {
          thumbnail: null
        }
      }
    }
  }

  getUsers(): Promise<Object> {
    return this.http.get(this.usersUrl).toPromise()
  }

  checkUserExists(user, list) {
    let foundContactIndex = list.findIndex(contact => {
      return contact.login.username === user.login.username
    })
    if (foundContactIndex >= 0) return true
    return false
  }

  get currentUser(): Observable<UserModel> {
    return this._currentUser.asObservable()
  }

  getCurrentUser() {
    this.dataStore.currentUser = this.api.getCurrentUser()
    return this._currentUser.next({...this.dataStore}.currentUser)
  }

  saveCurrentUser(user: UserModel) {
    this.api.saveCurrentUser(user)
    this.dataStore.currentUser = user // or rehydrate from API (?)
    return this._currentUser.next({...this.dataStore}.currentUser)
  }

  isCurrentUser(): boolean {
    return JSON.parse(sessionStorage.getItem('user')) !== null
  }

  addUserToContacts(user) {
    let contactList = JSON.parse(sessionStorage.getItem('contacts')) || []
    if (this.checkUserExists(user, this.contacts)) {
      let message = 'Contact already exists!'
      alert(message)
      return new Error(message)
    }
    contactList.push(user)
    sessionStorage.setItem('contacts', JSON.stringify(contactList))
    this.refreshContacts()
  }

  removeUserFromContacts(user) {
    let contactList = JSON.parse(sessionStorage.getItem('contacts'))
    if(!contactList || !user || !user.login) return
    let foundContactIndex = contactList.findIndex(contact => {
      return contact.login.username === user.login.username
    })
    if (foundContactIndex >= 0) contactList.splice(foundContactIndex, 1)
    sessionStorage.setItem('contacts', JSON.stringify(contactList))
    this.refreshContacts()
  }

  editUser(newUser: UserModel) {
    const newContacts = this.contacts.map((contact: UserModel) => {
      if (contact.login.username === newUser.login.username) {
        return {...contact, ...newUser}
      } else return contact
    })

    this.resetContacts(newContacts)
  }

  resetContacts(newContacts) {
    this.contacts = newContacts
    sessionStorage.setItem('contacts', JSON.stringify(newContacts))
  }

  getContactList() {
    let contacts = sessionStorage.getItem('contacts')
    return JSON.parse(contacts)
  }

  refreshContacts() {
    this.contacts = this.getContactList()
  }
}
