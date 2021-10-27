import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
      .mapa-container{
        width:100%;
        height:100%;
      }
      .row{
        background-color:white;
        bottom: 50px;
        border-radius:5px;
        left: 50px;
        padding :10px;
        width: 400px;
        position:fixed;
        z-index:999;
      }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa') divMapa!: ElementRef;

  mapa!:mapboxgl.Map;

  zoomLevel: number = 12;

  center : [number,number] = [-72.1092819285253,-36.60016218483497]

  constructor() { }

  /* limpiando los listener */
  ngOnDestroy(): void {
    this.mapa.off('zoom',() =>{});
    this.mapa.off('zoomMed',() =>{});
    this.mapa.off('move',() =>{});
  }

  ngAfterViewInit(): void {
    /* la propiedad mapa nos da control total del objeto mapbox */
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center:  this.center,
      zoom: this.zoomLevel
    });

    /* captura zoom */
    this.mapa.on('zoom',()=>{
      this.zoomLevel = this.mapa.getZoom();
    });

    /* regula a no mas de 18 el zoom */
    this.mapa.on('zoomMed',()=>{
      if( this.mapa.getZoom() > 18){
        this.mapa.zoomTo(18);
      }
    });

    /* obtener las coordenadas centrales */
    this.mapa.on('move', (event) =>{
      const target =  event.target;
      const {lng,lat} = target.getCenter();
      this.center = [lng,lat];
    });

  }

  zoomOut(){
    this.mapa.zoomOut();
  }

  zoomIn(){
    this.mapa.zoomIn();
  }

  zoomCambio(valor :string){
    this.mapa.zoomTo(Number(valor));
  }

}
