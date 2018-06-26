import { Component, OnInit } from '@angular/core';
// import { AdService } from '../../legacy/ad.service';
// import { AdItem } from '../../legacy/ad-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Widget Board';
  // ads: AdItem[];
  constructor (/*private adService: AdService,*/) {}

  ngOnInit() {
    //this.ads = this.adService.getAds();
  }
}
