import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { ArtObject } from "../models/art-object";

@Injectable({
  providedIn: 'root'
})
export class ArtObjectService {

  example: string = '/assets/data/artObject.json'; // Из файла

  private url = "/artObject/";

  constructor(private http: HttpClient) {
  };

  getArtObjects(): Observable<ArtObject[]> {
    return this.http.get<ArtObject[]>(this.url);
  };
}
