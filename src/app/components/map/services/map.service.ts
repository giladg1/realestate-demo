import {Injectable} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {environment} from "../../../../environments/environment";
import {StoreService} from "../../../services/store.service";
import {MockDataModel} from "../../../model/mock-data-model";

@Injectable({
  providedIn: 'root'
})
export class MapService {
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  initialLat = 29.7722573;
  initialLng = -95.3982908;
  zoom = 14;
  data: Array<MockDataModel>;
  counter = 0

  constructor(private storeService: StoreService) {
    mapboxgl.accessToken = environment.mapbox.accessToken;
    // this.storeService.getData().subscribe((data: Array<MockDataModel>) => {
    //   this.data = data;
    // })
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.initialLng, this.initialLat]
    })
    this.map.addControl(new mapboxgl.NavigationControl());
  }

  createMarkers(items: Array<MockDataModel>) {
    // we don't want to create new markers each time the data is changed, only for the first time
    if (this.counter === 0) {
      items.forEach((item: MockDataModel, index: number) => {
        const popup = new mapboxgl.Popup({offset: 25}).setHTML(`
        <h4 class="popup-marker-header">${item.name}</h4>
        <div class="popup-marker-text-div"><p class="text-elem">Vintage: </p><p class="text-elem">${item.yearBuilt}</p></div>
        <div class="popup-marker-text-div"><p class="text-elem">Rent per unit: </p><p class="text-elem">${item.rentPerUnit}</p></div>
      `);
        // create marker
        var marker = new mapboxgl.Marker()
          .setLngLat([item.longitude, item.latitude])
          .setPopup(popup)
          .addTo(this.map);
      })
    }
    this.counter++
  }
}
