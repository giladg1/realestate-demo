import {AfterViewInit, Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject} from "rxjs";
import {StoreService} from "../../services/store.service";
import {takeUntil} from "rxjs/operators";
import {MockDataModel} from "../../model/mock-data-model";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {
  // When window size is changing we want to auto size the ag-grid column to the screen size
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.agGrid.api.sizeColumnsToFit()
  }
  ngUnSubscribe: Subject<void> = new Subject<void>();
  columnDefs = [];
  rowData = [];
  constructor(private storeService: StoreService) {
  }
  // get the ag-grid element
  @ViewChild('agGridElem') agGrid;

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

  /**
   * Prepare header names and data to populate ag-grid
   */
  ngOnInit(): void {
    this.columnDefs = [
      {headerName: '', field: 'checked', checkboxSelection: true, width: 50},
      {headerName: 'NAME', field: 'name'},
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

  /**
   * After view loaded, we want to auto size the ag-grid column
   */
  ngAfterViewInit() {
    console.log(this.agGrid);
    this.agGrid.api.sizeColumnsToFit()
  }

  ngOnDestroy() {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }

}
