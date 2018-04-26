import { Subject } from 'rxjs/Subject'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { UserModel, genders } from './user-model';
import { ObserveOnOperator } from 'rxjs/operators/observeOn';

@Injectable()
export class UserService {
  private usersUrl = 'https://randomuser.me/api/?results=15'
  public users: Object[] = []
  public genders: String[] = genders
  public contacts: Object[] = this.getContactList() || []
  public currentUser: UserModel = this.getCurrentUser()

  constructor(private http: HttpClient) { }

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

  getCurrentUser(): UserModel {
    return JSON.parse(sessionStorage.getItem('user'))
  }

  saveCurrentUser(user: UserModel) {
    this.currentUser = user
    sessionStorage.setItem('user', JSON.stringify(user))
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
