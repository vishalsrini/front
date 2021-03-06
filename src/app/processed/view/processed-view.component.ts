import { Component, Input, ViewChild } from '@angular/core';

import { MainServiceComponent } from '../../service/main-service.component';
import { UtilityService } from '../../service/utility-service.component';
import { AlertService } from '../../auth/_services/alert.service';

import { Negotiate } from '../../models/negotiate';

declare var $:any;

@Component({
    selector: 'app-processed',
    templateUrl: './processed-view.component.html',
    styleUrls: ['./processed-view.component.css']
})
export class ProcessedView {
    @ViewChild('processedPost') processedPost;
    @ViewChild('modalImage') modalImage;
    @Input() edit;
    off: boolean = true;
    requirements: any[] = [];
    offers: any[] = [];
    search: String;
    fullImage: Boolean;
    // For negotiation
    negotiate: Negotiate;
    @Input() negotiateView: String = null;
    @Input() inputView: any[];


    constructor(private service: MainServiceComponent, private _utility: UtilityService,
        private _alert: AlertService) {
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
            if (this.negotiateView == 'offer') {
                if (this.inputView) {
                    this.off = true;
                    this.offers = this.inputView;
                }
            } else if (this.negotiateView == 'req') {
                if (this.inputView) {
                    this.off = false;
                    this.offers = this.inputView;
                }
            } else {
                this.getOffers();
            }
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
        this._utility.showLoader();
        this.negotiate.negotiatedItemId = id;
        this.service.postNegotiation(from, 'processed', this.negotiate).subscribe(res => {
            console.log("JSON RESPONSE", JSON.stringify(res));
            this._utility.hideLoader();
            this._alert.success(res.message);
        })
    }

    viewFullScreen(image) {
        this.modalImage.showChildModal(image);
    }
}