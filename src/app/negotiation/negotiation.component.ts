import { Component } from '@angular/core';
import { MainServiceComponent } from '../service/main-service.component';


@Component({
    selector: 'app-negotiation',
    templateUrl: './negotiation.component.html',
    styleUrls: ['./negotiation.component.css']
})
export class NegotiationComponent {
    offer: String = 'offer';
    req: String = 'req';
    rawreq: any = [];
    processedreq: any = [];
    rawoff: any = [];
    processedoff: any = [];
    
    constructor(private _service: MainServiceComponent) {
        this._service.getNegotiationList('req','raw').subscribe((response) => {
            // this.rawreq = response.negotiatedItemId;
            let negotiate = [];
            for(let i =0 ; i <= response.length; i++) {
                if(i==response.length) {
                    this.rawreq = negotiate;
                } else {
                    response[i].negotiatedItemId.status = response[i].status;
                    negotiate.push(response[i].negotiatedItemId);
                }
            }
            
        })
        this._service.getNegotiationList('offer','raw').subscribe((response) => {
            // this.rawoff = response.negotiatedItemId;
            let negotiate = [];
            for(let i =0 ; i <= response.length; i++) {
                if(i==response.length) {
                    this.rawoff = negotiate;
                } else {
                    response[i].negotiatedItemId.status = response[i].status;
                    negotiate.push(response[i].negotiatedItemId);
                }
            }
        })
        this._service.getNegotiationList('req','processed').subscribe((response) => {
            // this.processedreq = response.negotiatedItemId;
            let negotiate = [];
            for(let i =0 ; i <= response.length; i++) {
                if(i==response.length) {
                    this.processedreq = negotiate;
                } else {
                    response[i].negotiatedItemId.status = response[i].status;
                    negotiate.push(response[i].negotiatedItemId);
                }
            }
        })
        this._service.getNegotiationList('offer','processed').subscribe((response) => {
            // this.processedoff = response.negotiatedItemId;
            let negotiate = [];
            for(let i =0 ; i <= response.length; i++) {
                if(i==response.length) {
                    this.processedoff = negotiate;
                } else {
                    response[i].negotiatedItemId.status = response[i].status;
                    negotiate.push(response[i].negotiatedItemId);
                }
            }
        })
    }
}