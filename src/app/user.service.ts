import { Subject } from 'rxjs/Subject'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class UserService {
  usersUrl = 'https://randomuser.me/api/?results=15' //JSON.parse('../assets/config.json').usersUrl
  users: Object[] = []
  contacts: Object[] = this.getContactList() || []

  // Observable string sources (Subject)
  // public addContactSubject: Subject<Object> = new Subject<Object>()
  // public removeContactSubject: Subject<Object> = new Subject<Object>()

  // addContact$ = this.addContactSubject.asObservable()
  // removeContact$ = this.removeContactSubject.asObservable()

  constructor(private http: HttpClient) {
    // this.addContactSubject.subscribe(user => {
    //   this.addUserToContacts(user)
    // })
    // this.removeContactSubject.subscribe(user => {
    //   this.removeUserFromContacts(user)
    // })
  }

  getUsers() {
    return new Promise((resolve, reject) => {
      this.http.get(this.usersUrl)
        .toPromise()
        .then(res => {
          return resolve(res)
        }, err => reject(err))
    })
  }

  checkUserExists(user, list) {
    let foundContactIndex = list.findIndex(contact => {
      return contact.login.username === user.login.username
    })
    if (foundContactIndex >= 0) return true
    return false
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

  editUser(user) {
    console.log(user)
  }

  getContactList() {
    let contacts = sessionStorage.getItem('contacts')
    return JSON.parse(contacts)
  }

  refreshContacts() {
    this.contacts = this.getContactList()
  }
}
