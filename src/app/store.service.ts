import { Injectable } from '@angular/core';

import { Country } from "./country";
import { COUNTRIES } from "./mock-country";


@Injectable({
  providedIn: 'root'
})
export class StoreService {

  getCountriesStats():Promise<Country[]> {
    return Promise.resolve(COUNTRIES);
  }

  constructor() { }
}
