import { Injectable } from '@angular/core';
import { WidgetItem } from './widget-item';
import { TimerComponent } from './timer/timer.component';
import { TestWidgetComponent } from './test-widget/test-widget.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {
  getWidgets() {
    return [
    new WidgetItem(PieChartComponent, {name: "0"}),
    new WidgetItem(TimerComponent, {name: "1"}),
    new WidgetItem(TestWidgetComponent, {name: "2"})
    ]
  }

  constructor() { }
}
