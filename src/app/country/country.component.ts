import { Component, OnInit } from '@angular/core';

import { TESTS } from "../mock-test";

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  tests = TESTS;
  
  constructor() { }

  ngOnInit() {
  }


}
