import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MainServiceComponent } from '../../service/main-service.component';
import { Negotiate } from '../../models/negotiate';
import { UtilityService } from '../../service/utility-service.component';
import { AlertService } from '../../auth/_services/alert.service';
import * as _ from 'lodash';

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

    origin: any[] = [];
    year: any[] = [];
    nutCount: any[] = [];
    outTurn: any[] = [];
    originalArray: any[] = [];
    searchableArea(response) {
        this.origin.length = 0;
        this.year.length = 0;
        this.nutCount.length = 0;
        this.outTurn.length = 0;
        for (var i = 0; i < response.length; i++) {
            this.origin.push(response[i].origin);
            this.year.push(response[i].year);
            this.nutCount.push(response[i].nutCount);
            this.outTurn.push(response[i].outTurn);
            if (i == response.length - 1) {
                this.origin = _.uniq(this.origin);
                this.year = _.uniq(this.year);
                this.nutCount = _.uniq(this.nutCount);
                this.outTurn = _.uniq(this.outTurn);
            }
        }
    }

    getOffers() {
        this.service.getRawOffers().subscribe(response => {
            console.log(response);
            this.offers = response;
            this.originalArray = response;
            this.searchableArea(response);
        })
    }

    getRequirements() {
        this.service.getRawRequirements().subscribe(response => {
            console.log(response);
            this.offers = response;
            this.originalArray = response;
            this.searchableArea(response);
        })
    }


    /** Getting particular offer */
    getOffer() {
        this.service.getRawOffer().subscribe(response => {
            console.log(response);
            this.offers = response.raw;
            this.originalArray = response.raw;
            this.searchableArea(response.raw);
        })
    }

    /** Getting particular requirement */
    getRequirement() {
        this.service.getRawRequirement().subscribe(response => {
            console.log(response);
            this.offers = response.raw;
            this.originalArray = response.raw;
            this.searchableArea(response.raw);
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

        selected: any[] = [];
    onSelect(category: string, value: string, event: any) {
        if (event) {
            if (event.target.checked) {
                this.selected.push({
                    category: category,
                    value: value
                })
                console.log('selected -- ', this.selected);
                this.filterArray();
            } else {
                // this.selected.splice(this.selected.indexOf({
                //     category: category,
                //     value: value
                // }), 1);

                this.selected = _.remove(this.selected, function (n) {
                    console.log(n, category, value);
                    return !_.isEqual(n, { category: category, value: value });
                })
                console.log('seected Aray - ', this.selected);
                this.filterArray();
            }
        } else {
            this.selected = _.remove(this.selected, function (n) {
                console.log(n, category, value);
                return !_.isEqual(n, { category: category, value: value });
            })
            console.log('seected Aray - ', this.selected);
            this.filterArray();
        }
    }

    filterArray() {
        this.offers = this.originalArray;
        let offer: any[] = [];
        for (var i = 0; i < this.selected.length; i++) {
            let item = JSON.parse('[{"' + this.selected[i].category + '":"' + this.selected[i].value + '"}]');
            // offer = _.concat(offer, _.intersectionBy(this.offers, item, this.selected[i].category));
            this.offers = _.concat(offer, _.filter(this.offers, (n) => {
                return _.isEqual(n[this.selected[i].category], this.selected[i].value);
            }))
            // console.log(offer);
            // if(i == this.selected.length-1) {
            //     // for(var j=0; j<offer.length; j++ ) {
            //     //     this.offers = offer[j]
            //     // }
            //     this.offers = offer;
            //     this.offers = _.uniq(this.offers);
            // }
        }
    }

}