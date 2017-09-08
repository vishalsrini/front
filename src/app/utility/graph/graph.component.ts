import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ChartData } from 'app/utility/graph/chartData.interface'
@Component({
  moduleId: module.id,
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent {
  @Input() json: any;
  @Output() eventemit: EventEmitter<boolean> = new EventEmitter<boolean>();
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  // Pie
  public pieChartLabels: string[] = ["Schedule1","Schedule2","Schedule3","Schedule4","Schedule5","Schedule6"];
  public pieChartData: number[] = [50,30,20,40,28,80];
  public pieChartType: string = 'pie';
  private pieOptions: any = {
      labels: {
        fontSize: 14
      }
  }
  public pieChartLegend: boolean = false;
  pieChartColors: any[] = [{ backgroundColor: ["#b8436d", "#00d9f9", "#a4c73c", "#a4add3", "#cfcfcf", "#FF4C4C", "#DAA520", "#898ABC"] }];

  // bar
  public barChartLabels: string[] = [];// ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: string = 'horizontalBar';
  public barChartLegend: boolean = false;
  public barChartData: any[] = [];
  public barChartColors: any[] = [{ backgroundColor: ["#107A83", "#107A83", "#107A83", "#107A83", "#107A83", "#107A83", "#107A83", "#107A83", "#107A83"] }];
  public barOptions = {
    labels: {
      fontSize: 12
    },
    scales: {
      xAxes: [{
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 10,
          // // Create scientific notation labels
          // callback: function(value, index, values) {
          //     return value + ' €';
          // }
        }
      }],
      yAxes: [{
        categoryPercentage: 1.0,
        barPercentage: 0.6
      }]
    }
  };
  listOfItems: any[] = [];
  ngOnChanges() {
    let flags = [];
    let output = [];
    if (this.json != null) {

      if (this.json.hasOwnProperty('active')) {
        let jsonData = this.json.active;
        let l = jsonData.length, i;
        for (i = 0; i < l; i++) {
          if (flags[jsonData[i].status]) continue;
          flags[jsonData[i].status] = true;
          output.push(jsonData[i].status);
        }
      }
      if (this.json.hasOwnProperty('pending')) {
        let jsonData = this.json.pending;

        let l = jsonData.length, i;
        for (i = 0; i < l; i++) {
          if (flags[jsonData[i].status]) continue;
          flags[jsonData[i].status] = true;
          output.push(jsonData[i].status);
        }
      }

    }
    this.listOfItems = output;
    // for(let k=0;k<this.listOfItems.length;k++)
    // {
    //     this.barChartData[k].label=this.listOfItems[k];
    // }
    let temp: any = [];
    for (let j = 0; j < this.listOfItems.length; j++) {
      this.barChartLabels.push(this.listOfItems[j]);
      // this.pieChartLabels.push(this.listOfItems[j]);
      // this.pieChartLabels.push(this.listOfItems[j]);
      let countValue = this.getCount(this.listOfItems[j]);
      temp.push(countValue);
    }
    console.log(this.listOfItems);
    //  this.lineChartData = temp;
    console.log(temp);

    this.barChartData = temp;

    // this.pieChartData = temp;
  }


  getCount(value) {
    let count = 0;
    if (this.json.hasOwnProperty('pending')) {
      let jsonData = this.json.pending;
      for (let i = 0; i < jsonData.length; i++) {
        if (jsonData[i].status == value) {
          count++;
        }
      }
    }
    if (this.json.hasOwnProperty('active')) {
      let jsonData = this.json.active;
      for (let i = 0; i < jsonData.length; i++) {
        if (jsonData[i].status == value) {
          count++;
        }
      }
    }
    return count;
  }
  // events
  public chartClicked(e: any): void {
    console.log(this.pieChartData + " label --" + this.pieChartLabels);
    this.eventemit.emit(false)
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}