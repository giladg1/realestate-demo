import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {StoreService} from "../../services/store.service";
import {takeUntil} from "rxjs/operators";
import {MapService} from "./services/map.service";
import {MockDataModel} from "../../model/mock-data-model";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  ngUnSubscribe: Subject<void> = new Subject<void>();
  data: Array<object>;
  constructor(private storeService: StoreService, private map: MapService) { }

  /**
   * Prepare header names and data to populate ag-grid
   */
  ngOnInit(): void {
    this.map.buildMap()
    this.storeService.getData()
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe((data: Array<MockDataModel>) => {
        this.data = data;
        this.map.createMarkers(data)
      })
  }

  ngOnDestroy() {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }


}
