import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import { ArtObject } from "../../models/art-object";
import {ArtObjectType} from "../../models/art-object-type.enum";

@Component({
  selector: 'app-art-object-details',
  templateUrl: './art-object-details.component.html',
  styleUrls: ['./art-object-details.component.less']
})
export class ArtObjectDetailsComponent implements OnInit {

  @Input() artObject: ArtObject;
  @Output() artObjectChange = new EventEmitter<ArtObject>();

  constructor() { }

  ngOnInit() {
  }

  getStrType(key: number): string {
    return ArtObjectType[key];
  }

  onCloseClick() {
    this.artObjectChange.emit(null);
  }

}
