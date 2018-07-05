import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { TESTS } from "../mock-test";

import * as d3 from "d3";   
import { WidgetComponentInterface } from '../widget/widget.component';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
 // styleUrls: ['./pie-chart.component.css'],
//   styles: [
//   'svg {background-color: #0D1019;font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;width: 960px;height: 500px;border-radius: 8px;} path.slice {stroke-width: 2px;}polyline {opacity: .3;stroke: rgb(70, 70, 70);stroke-width: 1px;fill: none;}line {opacity: .3;stroke: rgb(70, 70, 70);stroke-width: 1px;fill: none;} '
//    ]
})
export class PieChartComponent implements OnInit,WidgetComponentInterface {
   @Input() data: any;

  constructor() { }

  ngOnInit() {
    this.pieChartGenerate(); 
  }

  pieChartGenerate() {
    /*
 * Массив data, содержащий ключ в виде названия страны и какое-либо 
 * значение, генерируемое при помощи Math.random()
 */
// var data = [                    
//   {"states":"USA","value" : Math.random()},
//   {"states":"China","value" : Math.random()},
//   {"states":"Russia","value" : Math.random()},
//   {"states":"Kazakhstan","value" : Math.random()},
//   {"states":"Mongolia","value" : Math.random()},
//   {"states":"India","value" : Math.random()},
// ];
  
  let data = TESTS;


  

/*
* var backupData = []; - если значения(не в % соотношении ) потребуется в дальнейшем
*/

  /* 
   * Cравнениe двух объектов из массива data.
   */
  function compare(a,b) {
      if (a.value < b.value)
          return -1;
      if (a.value > b.value)
          return 1;
      return 0;
  }
  /** Переменная
   * total отвечает за суммарное значение, используя его получаются процентные соотношения
   */
  var total = 0;
  
  for (var i = 0; i < data.length;i++) {  
      total += data[i].value;
  }
  for (var i = 0; i < data.length;i++) {  
      //backupData[i] = data[i].value;
      data[i].value = data[i].value/total * 100; 
  }

  data.sort(compare); // сортируем по возрастанию
  //backupData.sort();
  /*
  var svg = d3.select("body")
  .append("svg")
  .append("g")
  */
  let svg = d3.select(".secondSvg").append("g");

/**
* в существующем svg создаем 4 подэлемента с атрибутами класса 
* slices - в котором будут расположены элементы самого кругового графика
* labels - в котором будут расположены элементы текста
* lines - класс, в котором будут созданы линии соединяющие элементы класса slices и 
* элементы класса squares
* squares - элемент, в котором будет находится статичная графика, прямоугольники и 
* линии соединения прямоугольника и полилинии lines
*/
  svg.append("g")
  .attr("class", "slices");
  svg.append("g")
  .attr("class", "lines");
  svg.append("g")
  .attr("class", "squares");
  svg.append("g")
  .attr("class", "labels");

  var width = 1000,                      
  height = 600,                           
  radius = Math.min(width, height) / 2,   // радиус - половина диаметра выбирается по наименьшему
                                      // значению длины или высоты 
  outerRadius = height;


  var pie = d3.pie()                      // Создает контейнер pie для заданных значений
  .value(function(d){return d.value;});   

  var arc = d3.arc()                      // создает дугу с пара-ми для ВНЕШНЕГО круг. граф. 
  .outerRadius(radius * 0.6 - 10)         
  .innerRadius(radius * 0.5);             

  var arc1 = d3.arc()                     // создает дугу с пара-ми для ВНУТРЕННЕГО круг. граф.
  .outerRadius(radius * 0.5)              
  .innerRadius(radius * 0.35);            

  var outerArc = d3.arc()                 // дуга в которой находится полилинии
  .innerRadius(radius * 0.6)
  .outerRadius(radius * 0.54);

  var circlesArc = d3.arc()               // создает дугу для мелких окружностей, которые лежат на графике
  .innerRadius(radius * 0.54)
  .outerRadius(radius * 0.6);


  svg.attr("transform", "translate("+ width/2 + "," + height/2.5 + ")");  // смещение центра g элемента относительно верхнего левого угла

  var color = d3.scaleOrdinal()                                              
  .range(["#078C09", "#6699FF", "#72C1FA", "#0E4D94", "#13D4D4", "#0080FF"]); // цвета внешний круг(светлые)

  var colorDark = d3.scaleOrdinal()
  .range(["#0C2316", "#1A253C", "#1C2B3B", "#0D192B", "#0D2E35", "#0B213C"]); // цвета внутренний круг(темные)

  /* --------------------------------- Дуги графика-------------------------------------------*/
  var slice = svg.select(".slices").selectAll("path.slice")    
  .data(pie(data));                                       
  
  var id = 5; // уникальный id для каждой дуги, чтобы в дальнейшем с определенной дугой
              // связывать определенные элементы класса squares

  /*
   * Cоздает новые элементы для дуг, а затем отрисовывает эти же дуги
   * Присваивает уникальный id каждой дуге, и уникальный цвет (внешние дуги окружности) 
   */

  slice.enter()                   
  .insert("path") 
  .style("fill", function(d) {    
      return color(d.data.states);
  })  
  .attr("id",()=>"id"+(id--)) 
  .merge(slice)   
  .transition() // костыль от старого кода, без которого происходит ошибка 
  .attrTween("d", function(d){
      this._current = this._current || d;
      var interpolate = d3.interpolate(this._current, d);
      this._current = interpolate(0);
      return function(t) {
          return arc(interpolate(t));
      };
  })


  /*
   *  Все то же самое, но для внутренней части графика
   */

  var slice = svg.select(".slices").selectAll("path.slice2")
  .data(pie(data));
  
  slice.enter()
  .insert("path")
  .style("fill", function(d) {return colorDark(d.data.states);})
  .attr("class","slice2")
  .merge(slice)
  .transition()
  .attrTween("d", function(d){
      this._current = this._current || d;
      var interpolate = d3.interpolate(this._current, d);
      this._current = interpolate(0);
      return function(t) {
          return arc1(interpolate(t));
      };
  })


/*
*  Создание всех статичных элементов, которые есть на svg
* 
*/

  var statica = svg.select(".slices").selectAll("path");
  for (var i = 0; i < data.length; i++) {
  var swCheck = statica._groups[0][i].id;
  console.log(swCheck);
  switch (swCheck) {
      case "id5":
      svg.select(".squares")
          .append("rect")
          .attr("x", -500)
          .attr("y", -240)
          .attr("width", 195)
          .attr("height", 90)
          .style("fill", "#1B202E");

          svg.select(".squares")
          .append("rect")
          .attr("x", -305)
          .attr("y", -240)
          .attr("width", 5)
          .attr("height", 90)
          .style("fill", function(d) {return color(swCheck.slice(2));});

          svg.select(".labels")
          .append("text")
          .attr('font-size', '1.3em')
          .attr("x", -298)
          .attr('y', -200)
          .attr("fill","#E1E1E2")
          .text(d3.format(".0f")(data[0].value) + " %");

          svg.select(".labels")
          .append("text")
          .attr('font-size', '1.2em')
          .attr("x", -490)
          .attr('y', -220)
          .attr("fill","#E1E1E2")
          .text(data[0].states);

          svg.select(".squares")
          .append("line")
          .attr("x1",-300)
          .attr("y1",-195)
          .attr("x2",-250)
          .attr("y2",-195);

          break;

      case "id4":

      svg.select(".squares")
      .append("rect")
      .attr("x", -500)
      .attr("y", -70)
      .attr("width", 195)
      .attr("height", 90)
      .style("fill", "#1B202E");

      svg.select(".squares")
      .append("rect")
      .attr("x", -305)
      .attr("y", -70)
      .attr("width", 5)
      .attr("height", 90)
      .style("fill", function(d) {return color(swCheck.slice(2));});

      svg.select(".labels")
      .append("text")
      .attr('font-size', '1.3em')
      .attr("x", -298)
      .attr('y', -40)
      .attr("fill","#E1E1E2")
      .text(d3.format(".0f")(data[1].value) + " %");

      svg.select(".labels")
      .append("text")
      .attr('font-size', '1.2em')
      .attr("x", -490)
      .attr('y', -50)
      .attr("fill","#E1E1E2")
      .text(data[1].states);

      svg.select(".squares")
      .append("line")
      .attr("x1",-300)
      .attr("y1",-35)
      .attr("x2",-250)
      .attr("y2",-35);

      break;

      case "id3":

      svg.select(".squares")
          .append("rect")
          .attr("x", -500)
          .attr("y", 130)
          .attr("width", 195)
          .attr("height", 90)
          .style("fill", "#1B202E");

          svg.select(".squares")
          .append("rect")
          .attr("x", -305)
          .attr("y", 130)
          .attr("width", 5)
          .attr("height", 90)
          .style("fill", function(d) {return color(swCheck.slice(2));});
          
          svg.select(".labels")
          .append("text")
          .attr('font-size', '1.3em')
          .attr("x", -298)
          .attr('y', 160)
          .attr("fill","#E1E1E2")
          .text(d3.format(".0f")(data[2].value) + " %");

          svg.select(".labels")
          .append("text")
          .attr('font-size', '1.2em')
          .attr("x", -490)
          .attr('y', 150)
          .attr("fill","#E1E1E2")
          .text(data[2].states);

          svg.select(".squares")
          .append("line")
          .attr("x1", -300)
          .attr("y1", 170)
          .attr("x2", -250)
          .attr("y2", 170);
          break;

      case "id2":

      svg.select(".squares")
          .append("rect")
          .attr("x", 235)
          .attr("y", 130)
          .attr("width", 195)
          .attr("height", 90)
          .style("fill", "#1B202E");
          
          svg.select(".squares")
          .append("rect")
          .attr("x", 230)
          .attr("y", 130)
          .attr("width", 5)
          .attr("height", 90)
          .style("fill", function(d) {return color(swCheck.slice(2));});

          svg.select(".labels")
          .append("text")
          .attr('font-size', '1.3em')
          .attr("x", 180)
          .attr('y', 175)
          .attr("fill","#E1E1E2")
          .text(d3.format(".0f")(data[3].value) + " %");

          svg.select(".labels")
          .append("text")
          .attr('font-size', '1.2em')
          .attr("x", 320)
          .attr('y', 150)
          .attr("fill","#E1E1E2")
          .text(data[3].states);
          break;

      case "id1":

      svg.select(".squares")
          .append("rect")
          .attr("x", 235)
          .attr("y", -70)
          .attr("width", 195)
          .attr("height", 90)
          .style("fill", "#1B202E");

          svg.select(".squares")
          .append("rect")
          .attr("x", 230)
          .attr("y", -70)
          .attr("width", 5)
          .attr("height", 90)
          .style("fill", function(d) {return color(swCheck.slice(2));});

          svg.select(".labels")
          .append("text")
          .attr('font-size', '1.3em')
          .attr("x", 180)
          .attr('y', -30)
          .attr("fill","#E1E1E2")
          .text(d3.format(".0f")(data[4].value) + " %");

          svg.select(".labels")
          .append("text")
          .attr('font-size', '1.2em')
          .attr("x", 320)
          .attr('y', -50)
          .attr("fill","#E1E1E2")                   
          .text(data[4].states);

          svg.select(".squares")
          .append("line")
          .attr("x1",230)
          .attr("y1",-25)
          .attr("x2",180)
          .attr("y2",-25);
          break;

      case "id0":
      svg.select(".squares")
          .append("rect")
          .attr("x", 235)
          .attr("y", -240)
          .attr("width", 195)
          .attr("height", 90)
          .style("fill", "#1B202E");
          
          svg.select(".squares")
          .append("rect")
          .attr("x", 230)
          .attr("y", -240)
          .attr("width", 5)
          .attr("height", 90)
          .style("fill", function(d) {return color(swCheck.slice(2));});

          svg.select(".labels")
          .append("text")
          .attr('font-size', '1.3em')
          .attr("x", 180)
          .attr('y', -200)
          .attr("fill","#E1E1E2")
          .text(d3.format(".0f")(data[5].value) + " %");

          svg.select(".labels")
          .append("text")
          .attr('font-size', '1.2em')
          .attr("x", 320)
          .attr('y', -220)
          .attr("fill","#E1E1E2")
          .text(data[5].states);

          svg.select(".squares")
          .append("line")
          .attr("x1", 230)
          .attr("y1", -195)
          .attr("x2", 180)
          .attr("y2", -195);
          break;
  }
}


/* Полилинии, соединяющие статичные элементы и центры дуг
* Возвращает координаты для полилинии и создает для них блоки
*/
  var polyline = svg.select(".lines").selectAll("polyline")
  .data(pie(data));

  polyline.enter()
  .append("polyline")
  .merge(polyline)
  .transition()
  .attrTween("points", function(d) {
      this._current = this._current || d;
      var interpolate = d3.interpolate(this._current, d);
      this._current = interpolate(0);
      return function(t) {
          var d2 = interpolate(t);
          var index = d2.index;
          switch(index) {
          case 5: 
          return [outerArc.centroid(d2),-250,-195];

          case 4:
          /*
           *  Если значение двух самых малых дуг меньше или равняется 8 И следующая за ними дуга
           *  в пределах от 0 до 15
           *  Полилиния изменит свой выбор пути: Из направленного в статичный элемент
           *  Сначала уйдет в левую сторону по х, затем только начнет искать путь до статичной линии
           */
          if (data[0].value + data[1].value <=8 && data[2].value <=15) {
              return [outerArc.centroid(d2),circlesArc.centroid(d2)[0] - 100,circlesArc.centroid(d2)[1],-250,-35];
          }
          else {
          return [outerArc.centroid(d2),-250,-35];
          }

          case 3:
           return [outerArc.centroid(d2),-250,170];

          case 2: 
          /*
           *  Если значение двух самых больших дуг (или одной) превышает 50% от всего графика
           *  Полилиния будет изменяться: из направленной в статическую точку, в 
           *  Сначала будет идти до опр. у вниз и затем смещаться только по х до статичной линии
           */
          if (data[5].value >= 50 || data[5].value + data[4].value >=50) {
          svg.select(".squares")
          .append("line")
          .attr("x1",circlesArc.centroid(d2)[0])
          .attr("y1",180)
          .attr("x2",230)
          .attr("y2",180);
          return [outerArc.centroid(d2),circlesArc.centroid(d2)[0],180];
          }
          else{
          svg.select(".squares")
          .append("line")
          .attr("x1",180)
          .attr("y1",180)
          .attr("x2",230)
          .attr("y2",180);
           return [outerArc.centroid(d2),180,180];
          }

          case 1:
           return [outerArc.centroid(d2),180,-25];

          case 0:
           return [outerArc.centroid(d2),180,-195];
      }

  }; 
});

/*
*
*  Создание кругов на центрах дуг графика с заданным цветом 
* 
*/
  var circles = svg.selectAll(".circles")
  .data(pie(data));

  circles = circles.enter()
  .append("circle")
  .attr("class","circles")
  .attr("r",3)
  .attr("fill",function(d) {
  switch(d.index) {
      case 5: return color(d.index);
      case 4: return color(d.index);
      case 3: return color(d.index);
      case 2: return color(d.index);
      case 1: return color(d.index);
      case 0: return color(d.index);
  }
  })
  .style("stroke","black")
  .merge(circles)

  circles.transition()
  .attrTween("transform", function(d) {
      this._current = this._current || d;
      var interpolate = d3.interpolate(this._current,d);
      this._current = interpolate(0);
      return function(t) {
      var d2 = interpolate(t);
      return "translate(" + circlesArc.centroid(d2) + ")";

      };
  })




/* 
*  Статичный Текст, который используется в центре графика
*  использует переменную total как вывод
*/

  svg.select("g")
  .append("text")
  .attr("text-anchor", "middle")
  .attr('font-size', '1.5em')
  .attr('y', -25)
  .attr("fill","#E1E1E2")
  .text("Sample Text");

  svg.select("g")
  .append("text")
  .attr("text-anchor", "middle")
  .attr('font-size', '1.2em')
  .attr("fill","#E1E1E2")
  .text(d3.format(".8f")(total));

  svg.select("g")
  .append("text")
  .attr("text-anchor", "middle")
  .attr('font-size', '.8em')
  .attr('y', 15)
  .style("fill","#35383F")
  .style("font-style", "italic")
  .text("млрд.тг.");

  svg.select("g")
  .append("text")
  .attr("text-anchor", "middle")
  .attr('font-size', '1.5em')
  .attr('y', 50)
  .attr("fill","#E1E1E2")
  .text(d3.format(".0f")(data[0].value + data[1].value + data[2].value + data[3].value + data[4].value) + " %");
  
  
  }


}
