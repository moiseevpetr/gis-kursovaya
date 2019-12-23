import { OnInit, Component } from '@angular/core';
import * as L from 'leaflet';

import { ArtObjectService } from "../../services/art-object.service";
import { ArtObject } from "../../models/art-object";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit {

  private map;
  private artObjects: ArtObject[];
  private circleConfig = { radius: 20 };

  constructor(private artObjectService: ArtObjectService) {
  }

  ngOnInit() {
    this.loadArtObjects();
  }

  loadArtObjects() {
    this.artObjectService.getArtObjects()
      .subscribe(
        objects => {
          this.artObjects = objects;
          this.initMap();
          this.makeMarkers();
        }
      );
  };

  initMap(): void {
    this.map = L.map('map', {
      center: this.calcCenter(this.artObjects),
      zoom: 10
    });

    const tiles = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  makeMarkers(): void {
    if (this.artObjects && this.artObjects.length > 0) {
      for (const object of this.artObjects)
      {
        const marker : L.marker = L.marker([object.longitude, object.latitude]);
        marker.bindPopup(this.makePopup(object));
        marker.addTo(this.map);
      }
    }
  };

  makeCircleMarkers(): void {
    if (this.artObjects && this.artObjects.length > 0) {
      for (const object of this.artObjects)
      {
        const circle = L.circleMarker([object.longitude, object.latitude], this.circleConfig);
        circle.bindPopup(this.makePopup(object));
        circle.addTo(this.map);
      }
    }
  };

  makePopup(data: ArtObject): string {
    return `<div>Description: ${ data.description }</div>`;
  }

  calcCenter(objects: ArtObject[]): number[] {
    if (objects && objects.length > 0) {
      let latSum: number = 0;
      let lonSum: number = 0;
      for (const object of objects)
      {
        latSum += object.latitude;
        lonSum += object.longitude;
      }
      const latCenter = latSum/objects.length;
      const lonCenter = lonSum/objects.length;

      return [ lonCenter, latCenter ];
    }

    return [ 56.49771, 84.97437 ]; // Tomsk
  }
}
