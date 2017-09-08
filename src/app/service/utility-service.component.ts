import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class UtilityService {

    /****** Loading Service start ******/
    // Loader Components
    private _loader = new Subject<boolean>();
    startLoader = this._loader.asObservable();

    // Showing Loader
    showLoader() {
        // console.log("Inside show");
        this._loader.next(true);
    }

    // Hiding Loader
    hideLoader() {
        // console.log("Inside hide");
        this._loader.next(false);
    }
    /****** Loading Service Ends ******/

    // pagination Service
    getPager(totalItems: any, currentPage: any, pageSize: any) {
        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);

        // calculate start and end item indexes
        let startIndex = ((currentPage - 1) * pageSize);
        /*let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);*/
        let endIndex = Math.min((startIndex + pageSize - 1), totalItems - 1);

        // console.log('totalItems here' + totalItems);
        // console.log('startIndex here' + startIndex);
        // console.log('endIndex here' + endIndex);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startIndex: startIndex,
            endIndex: endIndex,
        };
    }

}
