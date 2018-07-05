import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CountryComponent } from './country/country.component';
import { WBoardComponent } from './w-board/w-board.component';
import { TimerComponent } from './timer/timer.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { TextAdderComponent } from './text-adder/text-adder.component';
import { WidgetDirective } from './widget.directive';
import { TestWidgetComponent } from './test-widget/test-widget.component';
import { WidgetService } from './widget.service';



@NgModule({
  declarations: [
    AppComponent,
    CountryComponent,
    WBoardComponent,
    TimerComponent,
    PieChartComponent,
    TextAdderComponent,
    WidgetDirective,
    TestWidgetComponent
    ],
  imports: [
    BrowserModule
  ],
  entryComponents: [
                    TestWidgetComponent,
                    TimerComponent,
                    PieChartComponent 
                  ],
  providers: [WidgetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
