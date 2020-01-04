import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";

import { AuthorizationService } from "../../services/authorization.service";
import { AuthorizationContract } from "../../models/authorization.contract";

@Component({
  selector: 'app-authorization-form',
  templateUrl: './authorization-form.component.html',
  styleUrls: ['./authorization-form.component.less']
})
export class AuthorizationFormComponent implements OnInit {

  authorizationForm: FormGroup;
  authError: boolean;

  constructor(
    private authorizationService: AuthorizationService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AuthorizationFormComponent>) {
  }

  ngOnInit(): void {
    this.formInit();
  }

  formInit(): void {
    this.authorizationForm = this.fb.group({
      email: [
        '',
        [
          Validators.email,
          Validators.maxLength(50)
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.maxLength(50)
        ]
      ]
    });
  }

  logIn(): void {
    if (this.authorizationForm.invalid) {
      return;
    }

    let auth: AuthorizationContract = this.authorizationForm.value;
    this.authorizationService.logIn(auth)
      .subscribe(result => {
        if (result) {
          this.authError = false;
          this.dialogRef.close();
        }
        else {
          this.authError = true;
        }
      });
  }

  close(): void {
    this.dialogRef.close();
  }

  rememberPass() {
    alert('Для восстановления пароля свяжитесь с администратором ' +
      'по адресу электронной почты moiseew.petya@yandex.ru.')
  }
}
