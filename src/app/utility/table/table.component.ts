import { Component, OnChanges, Input, AfterViewInit, ViewChild } from '@angular/core';
import { PaginationComponent } from '../pagination/pagination.component';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { Router } from '@angular/router'; // To route a particular request to other component
import { FilterPipe } from '../pipes/filter.component';

// Utility service
import { UtilityService } from 'app/service/utility-service.component';

declare let jsPDF;

@Component({
    moduleId: module.id,
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})
export class TableComponentU implements OnChanges, AfterViewInit {
    /* Items that we get from other component */
    @Input() json: any[]; // Full input json to be rendered
    // @Input() headers: any; // Get the headers
    @ViewChild('paginationComponent') paginationComponent: PaginationComponent; // object of pagination component

    /* Items that we declare for this component purpose */
    filter: string; // Search bar in table
    keys: string[]; // Keys of that particular JSON
    order: string; // Sorting this particular filed
    reverse: boolean; // Type of sort - Ascending or descending
    date: Date = new Date();  // To display current date above the table
    uniqueId: string; // Unique ID for each screen
    itemsPerPage: number; // Number of items per page to be displayed
    header: string[]; // Header of the particular table
    showItems: any[] = []; // For show and hide purpose. We need to have key and selected as properties
    showTable: boolean; // to show table after pagination
    currentPage: number; // show currentPage on load
    pager: any = {}; // pagination object
    pages: any[] = []; // pages for select dropdown
    start: number = 0;
    end: number = 0;
    showName:boolean; // to show link on schedule name
    scheduleId: number; // schedule id for routing
    tableJson: any[] = []; // to show data in table

    // set options for headings and title in the excel file
    options = {
        fieldSeparator: ',',
        quoteStrings: "'",
        decimalseparator: '.',
        showLabels: true,
        showTitle: false
    };

    constructor( private _router: Router, private _utility: UtilityService , private _pipe: FilterPipe) {
        this.currentPage = 1;  // initialize currentPage
    }

    // load the full component table and pagination
    ngAfterViewInit() {
        this.tableJson = this.json;
        //  this.currentPage = 1;  // initialize currentPage
        setTimeout(() => {
            this.pager = this.paginationComponent.setPage(this.currentPage);
            this.pages = this.paginationComponent.getTotalPages(this.pager);
        }
            , 1000);
        //  console.log('show the child and then table:' + this.showTable);
    }

    // Loads the json value on change of particular json
    ngOnChanges() {
        this._utility.showLoader();
        // console.log('inside'); // Checking whether data goes inside this function
        if (this.json.length > 0) {
            // Separating keys from values in json
            this.keys = Object.keys(this.json[0]);
            // For showing and hiding
            for  (const  key  of  this.keys) {
                if(key == 'postedBy' || key == '__v' || key == '_id') {
                    this.keys.splice(this.keys.indexOf(key), 1);
                } else
                if ( key === 'origin' || key === 'year' ||  key ===  'price' || key === 'quantity') {
                    this.showItems.push({ key:  key, selected:  true, reverse:  false  });
                } else  {
                    this.showItems.push({ key:  key, selected:  false, reverse:  false  });
                }
            }
            // Unique name for each pagination ID which is required in case if we have more pagination in one screen
            this.uniqueId = 'String' + Math.random().toString();
            // Number of items in one page is set to 5 by default
            this.itemsPerPage = 5;
            this._utility.hideLoader();
        }
    }

    // Sorting the table based on current column which is the parameter
    sorting(key: string): void {
        this.order = key;
        this.reverse = !this.reverse;

        // Checking whether order is correct or not
        // console.log(this.order);
    }

    // download the json in excel format
    downloadExcel() {
        new Angular2Csv(this.json, 'Schdeules', this.options);
    }

    // download the json in pdf format
    downloadPDF() {
        // create a landscape layout of pdf
        const doc = new jsPDF('l');
        let col = []; //
        const columns = [];
        col = Object.keys(this.json[0]); // keys of json set to col.
        for (let i = 0; i < col.length; i++) {
            columns.push(col[i].toUpperCase()); // converting each column name into uppercase for displaying it as heading
        }
        let rows = [];

        for (let item of this.json) {
            let temp = [];
            for (let i = 0; i < col.length; i++) {
                // console.log('Executing temp' + temp);
                temp.push(item[col[i]]); // create a temporary array which containes value for each column
            }
            rows.push(temp); // push the temporary array to create one array with multiple columns
            // console.log(rows);
        }
        // create a table with styles and column,row values
        doc.autoTable(columns, rows, {
            // tbale line styles
            tableLineColor: [0, 0, 0],
            tableLineWidth: 0.15,
            // heading styles
            headerStyles: {
                fillColor: [27, 116, 129],
                fontSize: 8
            },
            // body styles
            startY: 20,
            margin: { horizontal: 5 },
            bodyStyles: { valign: 'top' },
            styles: {
                overflow: 'linebreak', columnWidth: 'auto', lineColor: [0, 0, 0],
                lineWidth: 0.15, fontSize: 8
            },
            columnStyles: { text: { columnWidth: 'auto' } }
        });
        // title for the pdf page
        // doc.text('Schedule-Details For ' + this.headers.dealerId, 14, 16);

        // save the document as pdf
        doc.save('Schedules.pdf');
    }

// search the value from json
search(searchValue) {
    if (searchValue !== ''){
        this.tableJson = this._pipe.transform( this.json, searchValue, this.keys);
    } else {
        this.tableJson = this.json;
    }

    console.log('show table json', this.tableJson);
}

    // to navigate to edit schedule
    routeToEditSchedule(sName) {
        console.log('name of schedule', this.json);
        for (const element of this.json ){
          if (element.name === sName) {
              this.scheduleId = element.id;
          }
        }
           this._router.navigate(['/schedule', this.scheduleId]);
    }

}
