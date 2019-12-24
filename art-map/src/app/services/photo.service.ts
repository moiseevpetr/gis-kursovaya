import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Photo } from "../models/photo";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  exampleMain: string = '/assets/data/mainPhoto.json';
  examples: string = '/assets/data/photos.json';

  private url = "/api/photo/";

  constructor(private http: HttpClient) {
  };

  getMainPhoto(objectId: string): Observable<Photo> {
    //return this.http.get<Photo>(this.url + objectId + '/main');
    return this.http.get<Photo>(this.exampleMain);
  }

  getPhotos(objectId: string): Observable<Photo[]> {
    //return this.http.get<Photo[]>(this.url + objectId);
    return this.http.get<Photo[]>(this.examples);
  }
}
