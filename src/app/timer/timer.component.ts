import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import * as d3 from "d3";
import { WidgetComponentInterface } from '../widget/widget.component';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit,WidgetComponentInterface {
  @Input() data: any;

  

  constructor() { }

  ngOnInit() {
    this.createTimer();
  }

  createTimer() {
    let svgOverlay = d3.select(".firstSvg");

    let svg = d3.selectAll(".firstSvg");
    
    
    svgOverlay.attr("id","overlay");
    
    let digit = svg.selectAll(".digit");
    
    
    let digitPattern = [
            [1,0,1,1,0,1,1,1,1,1],
            [1,0,0,0,1,1,1,0,1,1],
            [1,1,1,1,1,0,0,1,1,1],
            [0,0,1,1,1,1,1,0,1,1],
            [1,0,1,0,0,0,1,0,1,0],
            [1,1,0,1,1,1,1,1,1,1],
            [1,0,1,1,0,1,1,0,1,1]
    ];
    
    
    (function tick() {
        let now = new Date,
        hours = now.getHours(),
        minutes = now.getMinutes(),
        seconds = now.getSeconds();
    
    
        digit = digit.data([hours/10 | 0, hours % 10,minutes / 10 | 0, minutes % 10, seconds / 10 | 0, seconds % 10]);
        digit.select("path:nth-child(1)").classed("lit", function(d) { return digitPattern[0][d]; });
        digit.select("path:nth-child(2)").classed("lit", function(d) { return digitPattern[1][d]; });
        digit.select("path:nth-child(3)").classed("lit", function(d) { return digitPattern[2][d]; });
        digit.select("path:nth-child(4)").classed("lit", function(d) { return digitPattern[3][d]; });
        digit.select("path:nth-child(5)").classed("lit", function(d) { return digitPattern[4][d]; });
        digit.select("path:nth-child(6)").classed("lit", function(d) { return digitPattern[5][d]; });
        digit.select("path:nth-child(7)").classed("lit", function(d) { return digitPattern[6][d]; });
        
    
    setTimeout(tick, 1000 - (now as any) % 1000);
    })();
    let now = new Date,
    day = now.getDate(),
    month = now.getMonth(),
    year = now.getFullYear();
    
    (month as any) = month < 10 ? "0"+(month+1) : (month+1);
    
    
    svg.append("text")
    .attr("text-anchor", "middle")
    .attr('font-size', '1.5em')
    .attr("x",60)
    .attr('y', 120)
    .attr("fill","#0075F4")
    .text(day + "." + month + "." + year);
    
    
  }
  

}
