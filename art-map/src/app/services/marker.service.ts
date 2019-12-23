import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  example: string = '/assets/data/example.geojson'; // Из файла

  circleConfig = {radius: 20};

  constructor(private http: HttpClient) {
  };

  makeMarkers(map: L.map): void {
    this.http.get(this.example).subscribe((res: any) => {
      for (const c of res.features) {
        if (c.geometry.type == 'Point') {
          const lat = c.geometry.coordinates[0];
          const lon = c.geometry.coordinates[1];
          const marker = L.marker([lon, lat]).addTo(map);
        }
      }
    });
  };

  makeCircleMarkers(map: L.map): void {
    this.http.get(this.example).subscribe((res: any) => {
      for (const c of res.features) {
        if (c.geometry.type == 'Point') {
          const lat = c.geometry.coordinates[0];
          const lon = c.geometry.coordinates[1];
          const circle = L.circleMarker([lon, lat], this.circleConfig);
          circle.bindPopup(this.makePopup(c));
          circle.addTo(map);
        }
      }
    });
  };

  makePopup(data: any): string {
    return `` +
      `<div>Description: ${ data.properties.description }</div>`;
  }
}
