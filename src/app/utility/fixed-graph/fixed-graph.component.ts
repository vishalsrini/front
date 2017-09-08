import { Component ,Input,EventEmitter,Output} from '@angular/core';
import { ChartData } from 'app/utility/graph/chartData.interface'
@Component({
  moduleId:module.id,
  selector: 'app-fixed-graph',
  templateUrl: './fixed-graph.component.html',
  styleUrls:['./fixed-graph.component.css']
})
export class FixedGraphComponent {
    @Input() json:any;
     @Output() eventemit:EventEmitter<boolean>=new EventEmitter<boolean>();
  // PolarArea
  public doughnutChartLabels:string[] = [];
  public doughnutChartData:number[] = [];
  public polarAreaLegend:boolean = true;
  public doughnutChartColors:any[]=[{backgroundColor:["#43b02a","#a7a9ac","#4b4b4b","#d0df00","#0057b8"]}];

  public doughnutChartType:string = 'doughnut';

  listOfItems:any[]=[];
ngOnChanges() {
   console.log(this.json);
    let flags = [];
    let output = [];
    if (this.json != null) {

      if (this.json.hasOwnProperty('active')) {
        let jsonData = this.json.active;
        let l = jsonData.length, i;
        for (i = 0; i < l; i++) {
          if ( flags[jsonData[i].lenderId] ) continue;
          flags[jsonData[i].lenderId] = true;
          output.push(jsonData[i].lenderId);
        }
      }
      if (this.json.hasOwnProperty('pending')) {
        let jsonData = this.json.pending;

        let l = jsonData.length, i;
        for (i = 0; i < l; i++) {
          if (flags[jsonData[i].lenderId]) continue;
          flags[jsonData[i].lenderId] = true;
          output.push(jsonData[i].lenderId);
        }
      }

    }
    this.listOfItems = output;
    let temp: any = [];
    for (let j = 0; j < this.listOfItems.length; j++) {
      if(this.listOfItems[j]){
      this.doughnutChartLabels.push(this.listOfItems[j]);
      let countValue = this.getCount(this.listOfItems[j]);
      if(countValue!=0){
      temp.push(countValue);
      }
    }
    }
    //console.log(this.listOfItems);
    //console.log(temp);
    temp=temp.sort();
    let n=temp.length;
    console.log(temp);
    temp=temp.slice(0,5);
   this.doughnutChartData=temp;
  }

  getCount(value) {
    let count = 0;
    if (this.json.hasOwnProperty('pending')) {
      const jsonData = this.json.pending;
      for (let i = 0; i < jsonData.length; i++) {
        if(jsonData[i].lenderId){
        if (jsonData[i].lenderId === value) {
          count++;
        }
        }
      }
    }
    if (this.json.hasOwnProperty('active')) {
      const jsonData = this.json.active;
      for (let i = 0; i < jsonData.length; i++) {
        if(jsonData[i].lenderId){
        if (jsonData[i].lenderId === value) {
          count++;
        }
        }
      }
    }
    return count;
  }
  // events
  public chartClicked(e:any):void {
    console.log(this.doughnutChartData +"---"+this.doughnutChartLabels)
  }
  public chartHovered(e:any):void {
  }
}
