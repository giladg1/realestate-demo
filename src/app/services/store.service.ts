import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {MockDataModel} from "../model/mock-data-model";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  /**
   * Initial mock data we will use to present items in different components parts
   */
  private _mockData: Array<MockDataModel> = [
    {
      name: 'Hiline Heights',
      yearBuilt: 2013,
      gla: 824,
      rentPerUnit: '$1,508',
      rentSqFt: 1.83,
      totalUnits: 256,
      latitude: 29.7722573,
      longitude: -95.3982908,
      hex: '#2196f3',
      selected: true
    },
    {
      name: 'The Core',
      yearBuilt: 2008,
      gla: 846,
      rentPerUnit: '$1,391',
      rentSqFt: 1.64,
      totalUnits: 326,
      latitude: 29.770153,
      longitude: -95.4002315,
      hex: '#93b286',
      selected: false
    },
    {
      name: 'The St Andrie',
      yearBuilt: 2019,
      gla: 728,
      rentPerUnit: '$1,612',
      rentSqFt: 2.21,
      totalUnits: 232,
      latitude: 29.7689996,
      longitude: -95.3965217,
      hex: '#ecc0ff',
      selected: false
    },
    {
      name: 'Heights West End',
      yearBuilt: 2016,
      gla: 743,
      rentPerUnit: '$1,414',
      rentSqFt: 1.90,
      totalUnits: 283,
      latitude: 29.7746407,
      longitude: -95.4017333,
      hex: '#fff6c0',
      selected: false
    },
    {
      name: 'Memorial Heights at Washington II',
      yearBuilt: 1998,
      gla: 655,
      rentPerUnit: '$1,079',
      rentSqFt: 1.65,
      totalUnits: 256,
      latitude: 29.7682588,
      longitude: -95.3948332,
      hex: '#ff88bb',
      selected: false
    }
  ]

  private data: BehaviorSubject<Array<MockDataModel>> = new BehaviorSubject<Array<MockDataModel>>(this._mockData)

  constructor() {
  }

  /**
   * Get the data as Observable
   */
  getData(): Observable<Array<MockDataModel>> {
    return this.data.asObservable();
  }

  /**
   * Update the data and dispatch event to update all other components using this data
   * @param newData
   */
  updateData(newData) {
    this.data.next(newData);
  }
}
