import { Component, Input, ViewChild } from '@angular/core';

import { MainServiceComponent } from '../../service/main-service.component';
import { UtilityService } from '../../service/utility-service.component';
import { AlertService } from '../../auth/_services/alert.service';

import { Negotiate } from '../../models/negotiate';
import * as _ from 'lodash';

declare var $: any;

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

    ngOnChanges() {
        this.changes();
    }
    origin: any[] = [];
    processedAt: any[] = [];
    type: any[] = [];
    grade: any[] = [];
    originalArray: any[] = [];
    searchableArea(response) {
        this.origin.length = 0;
        this.processedAt.length = 0;
        this.type.length = 0;
        this.grade.length = 0;
        for (var i = 0; i < response.length; i++) {
            this.origin.push(response[i].origin);
            this.processedAt.push(response[i].processedAt);
            this.type.push(response[i].type);
            this.grade.push(response[i].grade);
            if (i == response.length - 1) {
                this.origin = _.uniq(this.origin);
                this.processedAt = _.uniq(this.processedAt);
                this.type = _.uniq(this.type);
                this.grade = _.uniq(this.grade);
            }
        }
    }

    getOffers() {
        this.service.getProcessedOffers().subscribe(response => {
            console.log(response);
            // for (var i = 0; i < response.length; i++) {
            //     this.origin.push(response[i].origin);
            //     this.processedAt.push(response[i].processedAt);
            //     this.type.push(response[i].type);
            //     this.grade.push(response[i].grade);
            //     if (i == response.length - 1) {
            //         this.origin = _.uniq(this.origin);
            //         this.processedAt = _.uniq(this.processedAt);
            //         this.type = _.uniq(this.type);
            //         this.grade = _.uniq(this.grade);
            //     }
            // }
            this.searchableArea(response);
            this.offers = response;
            this.originalArray = response;
        })
    }

    getRequirements() {
        this.service.getProcessedRequirements().subscribe(response => {
            console.log(response);
            this.offers = response;
            this.searchableArea(response);
            this.originalArray = response;
        })
    }


    /** Getting particular offer */
    getOffer() {
        this.service.getProcessedOffer().subscribe(response => {
            console.log(response);
            this.offers = response.processed;
            this.searchableArea(response.processed);
            this.originalArray = response.processed;
        })
    }

    /** Getting particular requirement */
    getRequirement() {
        this.service.getProcessedRequirement().subscribe(response => {
            console.log(response);
            this.offers = response.processed;
            this.searchableArea(response.processed);
            this.originalArray = response.processed;
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
            this.processedPost.edit(type, offer);
        } else if (type == 'requirement') {
            this.processedPost.edit(type, offer);
        }
    }

    processedCashewPost(type) {
        // Show the backdrop
        // $('<div class="modal-backdrop"></div>').appendTo(document.body);
        if (type == 'offer') {
            this.processedPost.alert('offer');
        } else if (type == 'requirement') {
            this.processedPost.alert('req');
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
        this.service.postNegotiation(from, 'processed', this.negotiate).subscribe(res => {
            console.log("JSON RESPONSE", JSON.stringify(res));
            this._utility.hideLoader();
            this._alert.success(res.message);
        })
    }

    viewFullScreen(image) {
        this.modalImage.showChildModal(image);
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