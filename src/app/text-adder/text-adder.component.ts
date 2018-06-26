import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { WidgetItem } from '../widget-item';
import { WidgetDirective } from '../widget.directive';
import { WidgetComponentInterface } from "../widget/widget.component";

@Component({
  selector: 'app-text-adder',
  templateUrl: './text-adder.component.html',
  styleUrls: ['./text-adder.component.css']
})
export class TextAdderComponent implements OnInit {
  @Input() widgets: WidgetItem[];
  currentIndex = -1;
  @ViewChild(WidgetDirective) wHost: WidgetDirective;
  countWidgets: number = 0;
  ngOnInit(): void {
  }


  constructor (private componentFactoryResolver: ComponentFactoryResolver) {}

  loadComponent() {
    console.log(this.countWidgets);
    this.countWidgets += 1;
    this.currentIndex = (this.currentIndex + 1) % this.widgets.length;
    let widgetItem = this.widgets[this.currentIndex];
    console.log(widgetItem);

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(widgetItem.component);

    let viewContainerRef = this.wHost.viewContainerRef;
    //viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<WidgetComponentInterface>componentRef.instance).data = widgetItem.data;
    
  }


    
  

}
