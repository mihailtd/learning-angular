import { Component, OnInit, Inject, Output, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { UserModel } from '../user-model';

@Component({
  selector: 'app-contact-select',
  templateUrl: './contact-select.component.html',
  styleUrls: ['./contact-select.component.css']
})
export class ContactSelectComponent implements OnInit, AfterViewInit {
  public userSelect: FormControl = new FormControl(this.data.users)

  constructor(public dialogRef: MatDialogRef<ContactSelectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { contacts: UserModel[], users: UserModel[] }) { }

  compareFn(user1: UserModel, user2: UserModel): boolean {
    return user1 && user2 ? user1.email === user2.email : user1 === user2;
  }

  close(data): void {
    this.dialogRef.close(data);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

}
