import { OnInit, Component } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import * as R from 'rxjs/operators'

import { ArtObjectService } from "../../services/art-object.service";
import { ArtObject } from "../../models/art-object";
import { PhotoService } from "../../services/photo.service";

let map: L.map;
let selectedObject: ArtObject;
let artObjects: ArtObject[];

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit {

  layerControl: L.control.layers;
  iconBlue: L.icon;
  iconRed: L.icon;

  constructor(
    private artObjectService: ArtObjectService,
    private photoService: PhotoService
  ) {
  }

  ngOnInit() {
    this.setIcon();
    this.loadArtObjects();
  }

  getSelectedObject(): ArtObject {
    return selectedObject;
  }

  setSelectedObject(object: ArtObject) {
    selectedObject = object;
  }

  loadArtObjects() {
    this.artObjectService.getArtObjects()
      .subscribe(
        objects => {
          artObjects = objects;
          this.initMap();
        }
      );
  }

  initMap(): void {
    map = L.map('map', {
      center: this.calcCenter(artObjects),
      zoom: 12
    }).on('click', this.onMapClick);

    this.addTiles();
    this.addMarkers();
  }

  addTiles(): void {
    const osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const baseMaps = {
      "OpenStreetMap": osm
    };

    this.layerControl = L.control.layers(baseMaps).addTo(map);
  }

  addMarkers(): void {
    if (artObjects && artObjects.length > 0) {
      //let markersArr: L.marker[] = [];
      const cluster = L.markerClusterGroup();
      for (const object of artObjects) {

        const marker : L.marker = L.marker([object.longitude, object.latitude], {
          objectId: object.id,
          icon: this.iconRed
        }).on('click', this.onMarkerClick);

        this.makePopup(object).subscribe(
          popup => {
            marker.bindPopup(popup);
            //markersArr.push(marker);
            cluster.addLayer(marker);
          }
        );
      }

      //const markers = L.layerGroup(markersArr).addTo(map);
      cluster.addTo(map);

      //this.layerControl.addOverlay(markers, 'Арт-объекты').addTo(map);
      this.layerControl.addOverlay(cluster, 'Арт-объекты').addTo(map);
    }
  }

  makePopup(object: ArtObject) {
    return this.photoService.getMainPhoto(object.id)
      .pipe( R.map(
        photo =>  `` +
            `<div class="mat-h4">${ object.name }</div>` +
            `<img src="${ photo.photoPath }" alt="${ object.name }" width="100%" height="60%"/>`+
            `<div>Подробности: ${ object.description }</div>`
      ));
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

  setIcon(): void {
    this.iconBlue = L.icon({
      iconUrl: '/assets/icons/markerBlue.png',
      iconSize: [ 40, 40 ],
      iconAnchor: [ 20, 40 ]
    });

    this.iconRed = L.icon({
      iconUrl: '/assets/icons/markerRed.png',
      iconSize: [ 40, 40 ],
      iconAnchor: [ 20, 40 ]
    });
  }

  onMapClick(e) {
    L.popup()
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(map);
  }

  onMarkerClick(e) {
    const selectedId = e.target.options.objectId;
    selectedObject = artObjects.find(o => o.id == selectedId);
  }
}
