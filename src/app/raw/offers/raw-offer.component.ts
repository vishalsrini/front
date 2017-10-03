import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MainServiceComponent } from '../../service/main-service.component';
import { Negotiate } from '../../models/negotiate';

declare var $:any;

@Component({
    selector: 'app-raw-offer',
    templateUrl: './raw-offer.component.html',
    styleUrls: ['./raw-offer.component.css']
})
export class RawOffers implements OnInit{
    @ViewChild('rawPost') rawPost;
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
        this.service.getRawOffers().subscribe(response => {
            console.log(response);
            this.offers = response;
        })
    }

    getRequirements() {
        this.service.getRawRequirements().subscribe(response => {
            console.log(response);
            this.offers = response;
        })
    }
    

    /** Getting particular offer */
    getOffer() {
        this.service.getRawOffer().subscribe(response => {
            console.log(response);
            this.offers = response.raw;
        })
    }

    /** Getting particular requirement */
    getRequirement() {
        this.service.getRawRequirement().subscribe(response => {
            console.log(response);
            this.offers = response.raw;
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
            this.rawPost.edit(type, offer);
        } else if(type == 'requirement') {
            this.rawPost.edit(type, offer);
        }
    }

    rawCashewPost(type) {
        if(type == 'offer') {
            this.rawPost.alert('offer');
        } else if(type == 'requirement') {
            this.rawPost.alert('req');
        }
    }

    isNotMobile(){
        if($(window).width() > 991){
            return false;
        }
        return true;
    }

    negotiateItem(id, from) {
        this.negotiate.type  = 'raw';
        this.negotiate.from = from;
        this.negotiate.negotiateId = id;
        this.service.postNegotiation(this.negotiate).subscribe(res => {
            console.log(JSON.stringify(res));
        })
    }
}