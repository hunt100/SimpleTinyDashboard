import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef,} from '@angular/core';
import { WidgetItem } from '../widget-item';
import { WidgetService } from '../widget.service';




@Component({
  selector: 'app-w-board',
  templateUrl: './w-board.component.html',
  styleUrls: ['./w-board.component.css']
})
export class WBoardComponent implements OnInit {
  widgets: WidgetItem[];
  
  public show:boolean = true;
  public buttonName:any = '▲';

  toggle() {
    this.show = !this.show;
    
    if(this.show)  
      this.buttonName = "▲";
    else
      this.buttonName = "▼";
      
  }

  constructor(private widgetService: WidgetService) { }

   openNav():void {
    document.getElementById("mySidenav").style.width = "200px";
    //document.getElementById("main").style.marginLeft = "200px";
}

 closeNav():void {
    document.getElementById("mySidenav").style.width = "0";
    //document.getElementById("main").style.marginLeft= "0";
}


  ngOnInit() {
    this.widgets = this.widgetService.getWidgets();
  }

}
