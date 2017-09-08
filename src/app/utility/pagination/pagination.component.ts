import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// Service
import { UtilityService } from 'app/service/utility-service.component';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() tableArray: any[]; // array of items from the table
  @Input() pages: any[];    // page numbers of the dropdown
  @Output() eventStart: EventEmitter<number> = new EventEmitter();      // event for the startIndex
  @Output() eventEnd: EventEmitter<number> = new EventEmitter();        // event for the endIndex
  @Output() eventShowTable: EventEmitter<boolean> = new EventEmitter(); // event for showing the table
  @Output() eventCurrentPage: EventEmitter<number> = new EventEmitter(); // event currentPage

  currentPage: number;  // give the currentPage
  pageSize: number;     // give the pagesize for currentPage
  pager: any = {};      // pagination object
  start: number;        // starting index of table
  end: number;          // ending index of table
  showTable: boolean;   // to show table after pagination

  constructor(private _service: UtilityService) {
    this.currentPage = 1;
    this.pageSize = 5;
    this.start = 0;
    this.end = 4;
  }

  // on load set the currentPage
  ngOnInit() {
    this.setPage(this.currentPage);
    this.pages = this.getTotalPages(this.pager);
  }

  // get totalPages to show in dropdown
  getTotalPages(pager) {
    const pageArray = [];            // to get total numbers of pages
    for (let i = 1; i <= pager.totalPages; i++) {
      pageArray.push({ 'page': 'page ' + i, 'value': i });
    }
    return pageArray;
  }

  // set the page as selected from dropdown
  setPage(page: any) {

    /*this.pages = []; // page numbers of the dropdown*/
    if (page) {
      this.currentPage = parseInt(page, 10);
    }

    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    // get pagination object from service and set the values of starting and ending index and showtable
    if (this.tableArray.length !== 0) {
      this.pager = this._service.getPager(this.tableArray.length, this.currentPage, this.pageSize);

      //      console.log('pager inside the setpage' + JSON.stringify(this.pager));

      this.start = this.pager.startIndex;
      this.end = this.pager.endIndex;
      this.showTable = true;
    }

    // get the total number of pages on selecting page from the dropdown
    /* if (this.pages.length !== this.pager.totalPages) {
       this.pages = this.getTotalPages(this.pager);
     }*/
    // emitting the values to parent component
    this.eventStart.emit(this.start);
    this.eventEnd.emit(this.end);
    this.eventCurrentPage.emit(this.currentPage);
    this.eventShowTable.emit(this.showTable);

    // console.log('show current page' + this.currentPage);
    return this.pager;
  }

  // set the pagesize of table selecting value from dropdown
  setPageSize(pageSize: any) {

    /*this.pages = []; // page numbers of the dropdown*/
    this.pageSize = parseInt(pageSize, 10);

    // get pagination object from service and set the values of starting and ending index and showtable
    if (this.tableArray.length !== 0) {
      this.pager = this._service.getPager(this.tableArray.length, this.currentPage, this.pageSize);
    //  console.log('pager inside the pagesize' + JSON.stringify(this.pager));
      this.start = this.pager.startIndex;
      this.end = this.pager.endIndex;
    }

    // get the total number of pages on selecting page from the dropdown
    if (this.pages.length !== this.pager.totalPages) {
      this.pages = this.getTotalPages(this.pager);
    }

    // emitting the values to parent component
    this.eventStart.emit(this.start);
    this.eventEnd.emit(this.end);
    this.eventCurrentPage.emit(this.currentPage);
  }

}
