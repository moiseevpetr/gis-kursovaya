import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Photo } from "../models/photo";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  examples: string = '/assets/data/photo';

  private url = "/photo/";

  constructor(private http: HttpClient) {
  };

  getMainPhoto(objectId: string): Observable<Photo> {
    return this.http.get<Photo>(this.url + objectId + '/main');
    /*return this.http.get<Photo[]>(this.examples + objectId + ".json")
      .pipe(map(
        arr => arr.sort((a, b) => a.index - b.index)[0]
      ));*/
  }

  getPhotos(objectId: string): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.url + objectId);
    //return this.http.get<Photo[]>(this.examples + objectId + ".json");
  }
}
