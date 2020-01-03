import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";

import { AuthorizationFormComponent } from "../authorization-form/authorization-form.component";
import { AuthorizationService } from "../../services/authorization.service";
import { RegistrationFormComponent } from "../registration-form/registration-form.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {

  authDialogRef: MatDialogRef<AuthorizationFormComponent>;
  regDialogRef: MatDialogRef<RegistrationFormComponent>;

  constructor(
    private dialogModel: MatDialog,
    private authorizationService: AuthorizationService
  ) { }

  ngOnInit() {
  }

  openAuthDialog() {
    this.authDialogRef = this.dialogModel.open(AuthorizationFormComponent);
  }

  openRegDialog() {
    this.regDialogRef = this.dialogModel.open(RegistrationFormComponent);
  }

  getCurrentUser() {
    return this.authorizationService.currentUser;
  }

  logOut() {
    return this.authorizationService.logOut();
  }
}
