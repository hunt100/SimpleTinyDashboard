import { Component, OnInit, Input } from '@angular/core';
import { WidgetComponentInterface } from '../widget/widget.component';
import * as $ from "jquery";

@Component({
  selector: 'app-test-widget',
  templateUrl: './test-widget.component.html',
  styleUrls: ['./test-widget.component.css']
})
export class TestWidgetComponent implements WidgetComponentInterface {
  @Input() data: any;

  constructor() { }

  ngOnInit() {
    this.move();
  }

   move():void {
    let elem = document.getElementById("myBar");   
    let width = 1;
    let id = setInterval(frame, 15);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
      } else {
        width++; 
        elem.style.width = width + '%'; 
      }
      if (width == 100) {
        elem.innerHTML = "Success";
      }
    }
  }
  

}
