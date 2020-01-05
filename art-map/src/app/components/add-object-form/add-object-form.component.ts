import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";

import { ArtObjectType } from "../../models/art-object-type.enum";
import { RequestService } from "../../services/request.service";
import { Request } from "../../models/request";
import { AuthorizationService } from "../../services/authorization.service";
import { RequestType } from "../../models/request-type.enum";
import { RequestStatus } from "../../models/request-status.enum";
import { PhotoRequest } from "../../models/photo-request";
import { PhotoRequestType } from "../../models/photo-request-type.enum";

@Component({
  selector: 'app-add-object-form',
  templateUrl: './add-object-form.component.html',
  styleUrls: ['./add-object-form.component.less']
})
export class AddObjectFormComponent implements OnInit {

  addObjectForm: FormGroup;
  addPhotoForm: FormGroup;

  photoRequests: PhotoRequest[] = [];

  types: any = [
    {type: ArtObjectType.Graffiti, name: 'Граффити'},
    {type: ArtObjectType.Monument, name: 'Памятник'},
    {type: ArtObjectType.Installation, name: 'Инсталляция'},
  ];

  constructor(
    private authorizationService: AuthorizationService,
    private requestService: RequestService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddObjectFormComponent>
  ) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit(): void {
    this.addObjectForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],
      type: [
        '',
        Validators.required
      ],
      description: [
        ''
      ],
      longitude: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[.\d]+$/)
        ]
      ],
      latitude: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[.\d]+$/)
        ]
      ]
    });

    this.addPhotoForm = this.fb.group({
      photoUrl: ['', Validators.required]
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  addPhotoRequest(): void {
    let photoRequest: PhotoRequest = {
      id: null,
      requestId: null,
      photoPath: this.addPhotoForm.controls['photoUrl'].value,
      photoRequestType: PhotoRequestType.AddPhoto,
      photoId: null
    };

    this.photoRequests.push(photoRequest);
    this.addPhotoForm.controls['photoUrl'].setValue('');
  }

  deletePhotoRequest(index: number): void {
    this.photoRequests.splice(index, 1);
  }

  add(): void  {
    if (this.addObjectForm.invalid) {
      return;
    }

    let addRequest: any = this.addObjectForm.value;
    let request: Request = {
      id: null,
      reason: '',
      artObjectId: null,
      userId: this.authorizationService.currentUser.id,
      user: null,
      date: new Date(),
      requestType: RequestType.AddObject,
      requestStatus: RequestStatus.Consideration,
      artObjectName: addRequest.name,
      artObjectDescription: addRequest.description,
      artObjectCreationDate: new Date(),
      artObjectType: addRequest.type,
      artObjectLongitude: addRequest.longitude,
      artObjectLatitude: addRequest.latitude,
      photoRequests: this.photoRequests
    };

    //alert(JSON.stringify(request));
    this.requestService.addRequest(request)
      .subscribe(() =>
          this.dialogRef.close()
      );
  }
}
