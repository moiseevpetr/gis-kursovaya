import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { ArtObject } from "../../models/art-object";
import { AuthorizationService } from "../../services/authorization.service";
import { RequestService } from "../../services/request.service";
import { Request } from "../../models/request";
import { RequestType } from "../../models/request-type.enum";
import { RequestStatus } from "../../models/request-status.enum";
import { ArtObjectType } from "../../models/art-object-type.enum";

@Component({
  selector: 'app-delete-object-form',
  templateUrl: './delete-object-form.component.html',
  styleUrls: ['./delete-object-form.component.less']
})
export class DeleteObjectFormComponent implements OnInit {

  deleteObjectForm: FormGroup;
  artObject: ArtObject;

  constructor(
    private authorizationService: AuthorizationService,
    private requestService: RequestService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DeleteObjectFormComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.artObject = data.artObject;
  }

  ngOnInit() {
    this.formInit();
  }

  formInit(): void {
    this.deleteObjectForm = this.fb.group({
      reason: ['', Validators.maxLength(1000)]
    });
  }

  getStrType(type: ArtObjectType): string {
    switch (type) {
      case ArtObjectType.Graffiti:
        return 'Граффити';
      case ArtObjectType.Installation:
        return 'Инсталляция';
      case ArtObjectType.Monument:
        return 'Памятник';
      default:
        return 'Нет';
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  delete(): void  {
    if (this.deleteObjectForm.invalid) {
      return;
    }

    let deleteRequest: any = this.deleteObjectForm.value;
    let request: Request = {
      id: null,
      reason: deleteRequest.reason,
      artObjectId: this.artObject.id,
      userId: this.authorizationService.currentUser.id,
      user: null,
      date: new Date(),
      requestType: RequestType.DeleteObject,
      requestStatus: RequestStatus.Active,
      artObjectName: this.artObject.name,
      artObjectDescription: this.artObject.description,
      artObjectCreationDate: this.artObject.creationDate,
      artObjectType: this.artObject.typeKey,
      artObjectLongitude: this.artObject.longitude,
      artObjectLatitude: this.artObject.latitude,
      photoRequests: null
    };

    //alert(JSON.stringify(request));
    this.requestService.addRequest(request)
      .subscribe(() =>
        this.dialogRef.close()
      );
  }
}
