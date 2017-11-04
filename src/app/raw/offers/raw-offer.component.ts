import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MainServiceComponent } from '../../service/main-service.component';
import { Negotiate } from '../../models/negotiate';
import { UtilityService } from '../../service/utility-service.component';
import { AlertService } from '../../auth/_services/alert.service';

declare var $: any;

@Component({
    selector: 'app-raw-offer',
    templateUrl: './raw-offer.component.html',
    styleUrls: ['./raw-offer.component.css']
})
export class RawOffers implements OnInit {
    @ViewChild('rawPost') rawPost;
    @Input() edit;
    off: boolean = true;
    requirements: any[] = [];
    offers: any[] = [];
    search: String;

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

    ngOnChanges() {
        this.changes();
    }

    changes() {
        if (this.edit) {
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
        if (this.off) {
            this.getRequirement();
        } else {
            this.getOffer();
        }
        this.off = !this.off;
    }

    toggle() {
        this.offers.length = 0;
        if (this.off) {
            this.getRequirements();
        } else {
            this.getOffers();
        }
        this.off = !this.off;
    }

    editmethod(type, offer) {
        if (type == 'offer') {
            this.rawPost.edit(type, offer);
        } else if (type == 'requirement') {
            this.rawPost.edit(type, offer);
        }
    }

    rawCashewPost(type) {
        if (type == 'offer') {
            this.rawPost.alert('offer');
        } else if (type == 'requirement') {
            this.rawPost.alert('req');
        }
    }

    isNotMobile() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    }

    negotiateItem(id, from) {
        this._utility.showLoader();
        this.negotiate.negotiatedItemId = id;
        this.service.postNegotiation(from, 'raw', this.negotiate).subscribe(res => {
            console.log(JSON.stringify(res));
            this._utility.hideLoader();
            this._alert.success(res.message);
        })
    }
}