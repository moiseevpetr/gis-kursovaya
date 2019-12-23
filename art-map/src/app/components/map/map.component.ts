import { Component, AfterViewInit } from '@angular/core';
import * as Leaflet from 'leaflet';

import { MarkerService } from "../../services/marker.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements AfterViewInit {

  private map;

  constructor(private markerService: MarkerService) {
  }

  ngAfterViewInit() {
    this.initMap();
    this.markerService.makeMarkers(this.map);
  }

  private initMap(): void {
    this.map = Leaflet.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });

    const tiles = Leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }
}
