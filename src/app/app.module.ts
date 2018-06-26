import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CountryComponent } from './country/country.component';
import { WBoardComponent } from './w-board/w-board.component';
import { TimerComponent } from './timer/timer.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
// import { AdDirective } from '../../legacy/ad.directive';
// import { AdBannerComponent } from './ad-banner/ad-banner.component';
// import { HeroJobAdComponent } from './hero-job-ad/hero-job-ad.component';
// import { HeroProfileComponent } from './hero-profile/hero-profile.component';
// import { AdComponent } from './ad/ad.component';
// import { AdService } from '../../legacy/ad.service';
import { TextAdderComponent } from './text-adder/text-adder.component';
import { WidgetDirective } from './widget.directive';
import { WidgetComponentInterface } from './widget/widget.component';
import { TestWidgetComponent } from './test-widget/test-widget.component';
import { WidgetService } from './widget.service';



@NgModule({
  declarations: [
    AppComponent,
    CountryComponent,
    WBoardComponent,
    TimerComponent,
    PieChartComponent,
    // AdDirective,
    // AdBannerComponent,
    // HeroJobAdComponent,
    // HeroProfileComponent,
    TextAdderComponent,
    WidgetDirective,
    TestWidgetComponent
  ],
  imports: [
    BrowserModule
  ],
  entryComponents: [
                    // HeroJobAdComponent,
                    // HeroProfileComponent,
                    TestWidgetComponent,
                    TimerComponent,
                    PieChartComponent 
                  ],
  providers: [WidgetService],   //AdService
  bootstrap: [AppComponent]
})
export class AppModule { }
