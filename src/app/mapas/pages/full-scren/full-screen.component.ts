import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-full-scren',
  templateUrl: './full-screen.component.html',
  styles: [
    `
      #mapa{
        width:100%;
        height:100%;
      }
    `
  ]
})
export class FullScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
    var map = new mapboxgl.Map({
    container: 'mapa',
    style: 'mapbox://styles/mapbox/streets-v11',
    center:  [-72.1092819285253,-36.60016218483497],
    zoom:15
    });
  }

}
