import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

import { ArtObject } from "../../models/art-object";
import { ArtObjectType } from "../../models/art-object-type.enum";
import { Photo } from "../../models/photo";
import { PhotoService } from "../../services/photo.service";

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

  constructor(
    private photoService: PhotoService
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
}
