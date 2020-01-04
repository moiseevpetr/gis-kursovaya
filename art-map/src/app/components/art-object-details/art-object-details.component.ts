import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";

import { ArtObject } from "../../models/art-object";
import { ArtObjectType } from "../../models/art-object-type.enum";
import { Photo } from "../../models/photo";
import { PhotoService } from "../../services/photo.service";
import { EditObjectFormComponent } from "../edit-object-form/edit-object-form.component";
import { AuthorizationService } from "../../services/authorization.service";
import { DeleteObjectFormComponent } from "../delete-object-form/delete-object-form.component";

@Component({
  selector: 'app-art-object-details',
  templateUrl: './art-object-details.component.html',
  styleUrls: ['./art-object-details.component.less']
})
export class ArtObjectDetailsComponent implements OnInit, OnChanges {

  @Input() artObject: ArtObject;
  @Output() artObjectChange = new EventEmitter<ArtObject>();
  photos: Photo[];
  mainPhotoUrl: string;

  editDialogRef: MatDialogRef<EditObjectFormComponent>;
  deleteDialogRef: MatDialogRef<DeleteObjectFormComponent>;

  constructor(
    private photoService: PhotoService,
    private authorizationService: AuthorizationService,
    private dialogModel: MatDialog
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.loadPhotos();
  }

  loadPhotos(): void {
    if (!this.artObject) {
      return;
    }

    this.photoService.getPhotos(this.artObject.id)
      .subscribe(photos => {
        this.photos = photos;
        this.mainPhotoUrl = this.getMainPhotoUrl();
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

  getMainPhotoUrl(): string {
    if (!this.photos) {
      return null;
    }

    return this.photos.sort((a, b) => a.index - b.index)[0].photoPath;
  }

  onCloseClick() {
    this.artObjectChange.emit(null);
  }

  openEditDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {artObject: this.artObject};

    this.editDialogRef = this.dialogModel.open(EditObjectFormComponent, dialogConfig);
  }

  openDeleteDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {artObject: this.artObject};

    this.deleteDialogRef = this.dialogModel.open(DeleteObjectFormComponent, dialogConfig);
  }
}
