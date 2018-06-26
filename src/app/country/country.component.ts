import { Component, OnInit } from '@angular/core';

import { COUNTRIES } from "../mock-country";
import { TESTS } from "../mock-test";

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  countries = COUNTRIES;
  tests = TESTS;
  constructor() { }

  ngOnInit() {
  }

}
