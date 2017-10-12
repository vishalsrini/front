import { Component, Input, ViewChild } from '@angular/core';
import { MainServiceComponent } from '../../service/main-service.component';
import { Negotiate } from '../../models/negotiate';

declare var $:any;

@Component({
    selector: 'app-processed',
    templateUrl: './processed-view.component.html',
    styleUrls: ['./processed-view.component.css']
})
export class ProcessedView {
    @ViewChild('processedPost') processedPost;
    @Input() edit;
    off: boolean = true;
    requirements: any[] = [];
    offers: any[] = [];
    search: String;
    // For negotiation
    negotiate: Negotiate;

    constructor(private service: MainServiceComponent) {
        this.negotiate = new Negotiate();
    }

    ngOnInit() {
        this.changes();
        // this.ngOnChanges();
        // this.getOffers();
    }

    changes() {
        if(this.edit) {
            this.getOffer();
        } else {
            this.getOffers();
        }
    }

    ngOnChanges() {
        this.changes();
    }

    getOffers() {
        this.service.getProcessedOffers().subscribe(response => {
            console.log(response);
            this.offers = response;
        })
    }

    getRequirements() {
        this.service.getProcessedRequirements().subscribe(response => {
            console.log(response);
            this.offers = response;
        })
    }
    

    /** Getting particular offer */
    getOffer() {
        this.service.getProcessedOffer().subscribe(response => {
            console.log(response);
            this.offers = response.processed;
        })
    }

    /** Getting particular requirement */
    getRequirement() {
        this.service.getProcessedRequirement().subscribe(response => {
            console.log(response);
            this.offers = response.processed;
        })
    }

    toggleOnce() {
        this.offers.length = 0;
        if(this.off) {
            this.getRequirement();
        } else {
            this.getOffer();
        }
        this.off = !this.off;
    }

    toggle() {
        this.offers.length = 0;
        if(this.off) {
            this.getRequirements();
        } else {
            this.getOffers();
        }
        this.off = !this.off;
    }

    editmethod(type, offer) {
        if(type == 'offer') {
            this.processedPost.edit(type, offer);
        } else if(type == 'requirement') {
            this.processedPost.edit(type, offer);
        }
    }

    processedCashewPost(type) {
        // Show the backdrop
        // $('<div class="modal-backdrop"></div>').appendTo(document.body);
        if(type == 'offer') {
            this.processedPost.alert('offer');
        } else if(type == 'requirement') {
            this.processedPost.alert('req');
        }
    }

    isNotMobile(){
        if($(window).width() > 991){
            return false;
        }
        return true;
    }

    negotiateItem(id, from) {
        this.negotiate.type = 'processed';
        this.negotiate.from = from;
        this.negotiate.negotiateId = id;
        this.service.postNegotiation(this.negotiate).subscribe(res => {
            console.log(JSON.stringify(res));
        })
    }
}