import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {StoreService} from "../../services/store.service";
import {takeUntil} from "rxjs/operators";
import {MockDataModel} from "../../model/mock-data-model";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  ngUnSubscribe: Subject<void> = new Subject<void>();
  columnDefs = [];
  rowData = [];
  constructor(private storeService: StoreService) { }

  /**
   * Prepare header names and data to populate ag-grid
   */
  ngOnInit(): void {
    this.columnDefs = [
      {headerName: 'NAME', field: 'name', checkboxSelection: true },
      {headerName: 'YEAR BUILT', field: 'yearBuilt' },
      {headerName: 'GLA', field: 'gla'},
      {headerName: 'RENT PER UNIT', field: 'rentPerUnit'},
      {headerName: 'RENT SQFT', field: 'rentSqFt'},
      {headerName: 'TOTAL UNITS', field: 'totalUnits'}
    ];
    this.storeService.getData()
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe((data: Array<MockDataModel>) => {
        this.rowData = data;
      })
  }

  ngOnDestroy() {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }

  /**
   * When marking check or uncheck for a field item, we need to update the data
   * to let other components items will know about it
   * @param itemName
   */
  itemChecked(itemName: string): void {
    let newArray = Array.from(this.rowData)
    for (let i = 0; i < newArray.length; i++) {
      if (newArray[i].name == itemName) {
        newArray[i].selected = !newArray[i].selected;
        this.storeService.updateData(newArray);
        break;
      }
    }
  }

}
