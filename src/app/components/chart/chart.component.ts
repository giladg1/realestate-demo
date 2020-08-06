import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {StoreService} from "../../services/store.service";
import {takeUntil} from "rxjs/operators";
import * as Highcharts from 'highcharts';
import {MockDataModel} from "../../model/mock-data-model";
declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnDestroy {
  ngUnSubscribe: Subject<void> = new Subject<void>();
  data = [];
  constructor(private storeService: StoreService) { }

  /**
   * Prepare header names and data to populate ag-grid
   */
  ngOnInit(): void {
    this.storeService.getData()
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe((data: Array<MockDataModel>) => {
        this.data = data;
        // since the data in our example not arrive as a regular numberbut as string with symbols (according to the excel and the task instruction)
        // for example '$1,4343' , we need to prepare it to be normal number.
        const rentPerUnit = this.data.map(item => parseFloat(item.rentPerUnit.replace('$', '').replace(/,/g, ''))).sort()
        Highcharts.chart('container', {
          title: {
            text: 'RENT PER UNIT / VINTAGE'
          },
          xAxis: {
            min: 0,
            max: 5
          },
          yAxis: {
            min: 1000
          },
          series: [{
            type: 'line',
            name: 'Regression',
            data: [[2000, 1000], [2015, 1600]],
            marker: {
              enabled: false
            },
            states: {
              hover: {
                lineWidth: 0
              }
            },
            enableMouseTracking: false
          }, {
            type: 'scatter',
            name: 'Assets',
            data: rentPerUnit,
            marker: {
              radius: 4
            }
          }]
        });
    })

  }

  ngOnDestroy() {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }


}
