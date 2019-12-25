import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";

import { AuthorizationService } from "../../services/authorization.service";
import { RegistrationContract } from "../../models/registration.contract";

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.less']
})
export class RegistrationFormComponent implements OnInit {

  registrationForm: FormGroup;
  regError: boolean;

  constructor(
    private authorizationService: AuthorizationService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RegistrationFormComponent>) {
  }

  ngOnInit(): void {
    this.formInit();
  }

  formInit(): void {
    this.registrationForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(50)
        ]
      ],
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

  signIn(): void {
    if (this.registrationForm.invalid) {
      return;
    }

    let reg: RegistrationContract = this.registrationForm.value;
    this.authorizationService.signIn(reg)
      .subscribe(result => {
        if (result) {
          this.regError = false;
          this.dialogRef.close();
        }
        else {
          this.regError = true;
        }
      });
  }

  close(): void {
    this.dialogRef.close();
  }
}
