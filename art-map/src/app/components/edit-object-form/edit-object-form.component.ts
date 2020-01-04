import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { ArtObjectType } from "../../models/art-object-type.enum";
import { AuthorizationService } from "../../services/authorization.service";
import { RequestService } from "../../services/request.service";
import { Request } from "../../models/request";
import { RequestType } from "../../models/request-type.enum";
import { RequestStatus } from "../../models/request-status.enum";
import { ArtObject } from "../../models/art-object";

@Component({
  selector: 'app-edit-object',
  templateUrl: './edit-object-form.component.html',
  styleUrls: ['./edit-object-form.component.less']
})
export class EditObjectFormComponent implements OnInit {

  editObjectForm: FormGroup;
  artObject: ArtObject;

  types: any = [
    {type: ArtObjectType.Graffiti, name: 'Граффити'},
    {type: ArtObjectType.Monument, name: 'Памятник'},
    {type: ArtObjectType.Installation, name: 'Инсталляция'},
  ];

  constructor(
    private authorizationService: AuthorizationService,
    private requestService: RequestService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditObjectFormComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.artObject = data.artObject;
  }

  ngOnInit() {
    this.formInit();
  }

  formInit(): void {
    this.editObjectForm = this.fb.group({
      name: [
        this.artObject.name,
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],
      type: [
        this.artObject.typeKey,
        Validators.required
      ],
      description: [
        this.artObject.description
      ],
      longitude: [
        this.artObject.longitude,
        [
          Validators.required,
          Validators.pattern(/^[.\d]+$/)
        ]
      ],
      latitude: [
        this.artObject.latitude,
        [
          Validators.required,
          Validators.pattern(/^[.\d]+$/)
        ]
      ]
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  edit(): void  {
    if (this.editObjectForm.invalid) {
      return;
    }

    let editRequest: any = this.editObjectForm.value;
    let request: Request = {
      id: null,
      reason: '',
      artObjectId: this.artObject.id,
      userId: this.authorizationService.currentUser.id,
      date: new Date(),
      requestType: RequestType.EditObject,
      requestStatus: RequestStatus.Consideration,
      artObjectName: editRequest.name,
      artObjectDescription: editRequest.description,
      artObjectCreationDate: this.artObject.creationDate,
      artObjectType: editRequest.type,
      artObjectLongitude: editRequest.longitude,
      artObjectLatitude: editRequest.latitude
    };

    alert(JSON.stringify(request));
    //this.requestService.addRequest(request)
    //  .subscribe(() =>
    //    this.dialogRef.close()
    //  );
  }
}
