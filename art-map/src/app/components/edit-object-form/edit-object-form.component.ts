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
import { PhotoRequest } from "../../models/photo-request";
import { PhotoRequestType } from "../../models/photo-request-type.enum";
import { PhotoService } from "../../services/photo.service";
import { Photo } from "../../models/photo";

@Component({
  selector: 'app-edit-object',
  templateUrl: './edit-object-form.component.html',
  styleUrls: ['./edit-object-form.component.less']
})
export class EditObjectFormComponent implements OnInit {

  editObjectForm: FormGroup;
  addPhotoForm: FormGroup;

  artObject: ArtObject;
  photos: Photo[];
  deletedPhotos: Photo[] = [];
  photoRequests: PhotoRequest[] = [];

  types: any = [
    {type: ArtObjectType.Graffiti, name: 'Граффити'},
    {type: ArtObjectType.Monument, name: 'Памятник'},
    {type: ArtObjectType.Installation, name: 'Инсталляция'},
  ];

  constructor(
    private authorizationService: AuthorizationService,
    private requestService: RequestService,
    private photoService: PhotoService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditObjectFormComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.artObject = data.artObject;
  }

  ngOnInit(): void {
    this.formInit();
    this.loadPhotos();
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

    this.addPhotoForm = this.fb.group({
      photoUrl: ['', Validators.required]
    });
  }

  loadPhotos(): void {
    this.photoService.getPhotos(this.artObject.id)
      .subscribe(photos =>
        this.photos = photos
      );
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
    let photoRequest = this.photoRequests[index];

    if(photoRequest.photoRequestType == PhotoRequestType.DeletePhoto) {
      let photoIndex = this.deletedPhotos.findIndex(pr=>pr.id==photoRequest.photoId);
      let photo: Photo = this.deletedPhotos[photoIndex];

      this.photos.push(photo);
      this.deletedPhotos.splice(photoIndex,1);
    }

    this.photoRequests.splice(index, 1);
  }

  deletePhoto(index: number) {
    let photo = this.photos[index];

    let photoRequest: PhotoRequest = {
      id: null,
      requestId: null,
      photoPath: photo.photoPath,
      photoRequestType: PhotoRequestType.DeletePhoto,
      photoId: photo.id
    };

    this.photoRequests.push(photoRequest);
    this.deletedPhotos.push(photo);
    this.photos.splice(index, 1);
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
      user: null,
      date: new Date(),
      requestType: RequestType.EditObject,
      requestStatus: RequestStatus.Active,
      artObjectName: editRequest.name,
      artObjectDescription: editRequest.description,
      artObjectCreationDate: this.artObject.creationDate,
      artObjectType: editRequest.type,
      artObjectLongitude: editRequest.longitude,
      artObjectLatitude: editRequest.latitude,
      photoRequest: this.photoRequests
    };

    //alert(JSON.stringify(request));
    this.requestService.addRequest(request)
      .subscribe(() =>
        this.dialogRef.close()
      );
  }
}
