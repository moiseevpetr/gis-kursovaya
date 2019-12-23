import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { ArtObject } from "../models/art-object";

@Injectable({
  providedIn: 'root'
})
export class ArtObjectService {

  example: string = '/assets/data/example.geojson'; // Из файла

  constructor(private http: HttpClient) {
  };

  getArtObjects(): Observable<ArtObject[]> {
    return this.http.get(this.example)
      .pipe(
        map((res: any) => {
        let objects: ArtObject[] = [];
        for (const c of res.features) {
          if (c.geometry.type == 'Point') {
            let object: ArtObject = {
              id: Math.floor(Math.random() * 1000000).toString(),
              name: c.properties.iconCaption,
              creationDate: new Date(),
              latitude: c.geometry.coordinates[0],
              longitude: c.geometry.coordinates[1],
              type: 0,
              description: c.properties.description
            };
            objects.push(object)
          }
        }
        return objects;
        })
      )
  };
}
