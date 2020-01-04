import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { User } from "../../models/user";
import { RequestService } from "../../services/request.service";
import { Request } from "../../models/request";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.less']
})
export class UserDetailsComponent implements OnInit {

  user: User;
  requests: Request[] = [];

  constructor(
    private requestService: RequestService,
    private dialogRef: MatDialogRef<UserDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.user = data.user;
  }

  ngOnInit() {
    this.loadRequestsForUser();
  }

  close(): void {
    this.dialogRef.close();
  }

  changePass() {
    alert('Для смены пароля свяжитесь с администратором по адресу электронной почты moiseew.petya@yandex.ru.');
  }

  changeUser() {
    alert('Для смены имени и/или почты свяжитесь с администратором по адресу электронной почты moiseew.petya@yandex.ru.');
  }

  loadRequestsForUser() {
    this.requestService.getRequestForUser(this.user.id)
      .subscribe(requests =>
        this.requests = requests
      );
  }
}
