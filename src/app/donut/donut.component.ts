import { Component, OnInit, Input } from '@angular/core';
import * as d3 from "d3";
@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  // styleUrls: ['./donut.component.css']


})
export class DonutComponent {
  @Input() donutValue: number;
  @Input() donutColor: string;
  @Input() height: number;
  @Input() width: number;
  ngAfterContentInit() {
    var data = [
      { name: "donutValue", value: this.donutValue },
      { name: "remainingValue", value: 100 - this.donutValue },

    ];
    var text = "";

    var width = this.width;
    var height = this.height;
    var thickness = 25;

    var radius = Math.min(width, height) / 2;

    var svg = d3.select("#chart")
      .append('svg')
      .attr('class', 'pie')
      .attr('width', width)
      .attr('height', height);

    var g = svg.append('g')
      .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

    var arc = d3.arc()
      .innerRadius(radius - thickness + 10)
      .outerRadius(radius)


    var pie = d3.pie()
      .value(function (d) { return d.value; })
      .sort(null);

    var path = g.selectAll('path')
      .data(pie(data))
      .enter()
      .append("g")


      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) =>
        (i == 0) ? this.donutColor : "#efeff4"
      )
      .style("cursor", "pointer")

    g.append("text")
      .attr("class", "text-group")
      .attr("class", "value-text")
      .attr('text-anchor', 'middle')
      .style('font-size', '30px')
      .style('color', 'black')
      .text(this.donutValue + "%")
      .attr('dy', '0.3em')
  }

}
