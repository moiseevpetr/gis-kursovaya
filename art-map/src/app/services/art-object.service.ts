import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { ArtObject } from "../models/art-object";

@Injectable({
  providedIn: 'root'
})
export class ArtObjectService {

  example: string = '/assets/data/example.geojson'; // Из файла

  constructor(private http: HttpClient) {
  };

  getArtObjects(): Observable<ArtObject[]> {
    let objectsObserver = new Subject<ArtObject[]>();

    this.http.get(this.example).subscribe((res: any) => {
      let objects: ArtObject[] = [];
      for (const c of res.features) {
        if (c.geometry.type == 'Point') {
          const lat = c.geometry.coordinates[0];
          const lon = c.geometry.coordinates[1];
          const description = c.properties.description;

          let object: ArtObject = {
            id: '',
            name: '',
            creationDate: new Date(),
            latitude: lat,
            longitude: lon,
            type: 0,
            description: description
          };
          objects.push(object)
        }
      }
      objectsObserver.next(objects);
    });

    return objectsObserver;
  };
}
