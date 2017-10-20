import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';

import { RawCashewSchema } from '../../models/raw';

import { MainServiceComponent } from '../../service/main-service.component';
import { UtilityService } from '../../service/utility-service.component';
import { AlertService } from '../../auth/_services/alert.service';

declare var $: any;

@Component({
    selector: 'raw-post',
    templateUrl: './raw-posting.component.html',
    styles: ['.row { margin-left: auto; margin-right: auto } .checkbox input[type="checkbox"], .radio input[type="radio"] { opacity: 1 !important } ']
})
export class RawPost {
    @ViewChild('childModal') public childModal: ModalDirective;
    header: String = '';
    work: String;
    quote: RawCashewSchema;
    step: Number = 1;
    editBoolean: Boolean;

    constructor(private _service: MainServiceComponent, private _utility: UtilityService,
            private _alert: AlertService) {
        this.quote = new RawCashewSchema();
    }

    public showChildModal(): void {
        this.childModal.show();
    }

    public hideChildModal(): void {
        this.header = "";
        this.childModal.hide();
    }

    alert(message: string) {
        this.editBoolean = false;
        this.work = message;
        if (message == 'offer') {
            this.header = 'Post Your Offer';
        } else if (message == 'req') {
            this.header = 'Post Your Requirement';
        }
        this.childModal.show();
    }

    edit(message: string, offer: any) {
        this.editBoolean = true;
        this.work = message;
        if (message == 'offer') {
            this.header = 'Post Your Offer';
        } else if (message == 'req') {
            this.header = 'Post Your Requirement';
        }
        this.quote = offer;
        this.childModal.show();
    }

    save() {
        this._utility.showLoader();
        if(this.editBoolean) {
            this.update();
        } else if (this.work == 'offer') {
            console.log('Quotation : ', JSON.stringify(this.quote));
            this._service.postRawOffers(this.quote).subscribe(data => {
                console.log('Response : ', JSON.stringify(data));
                this._alert.success(data.message);
            }).add(response => {
                this._utility.hideLoader();
                this.hideChildModal();
            })
        } else if (this.work == 'req') {
            console.log('Requirement Quotation: ', JSON.stringify(this.quote));
            this._service.postRawRequirements(this.quote).subscribe(data => {
                console.log('Response of Requirement : ', JSON.stringify(data));
                this._alert.success(data.message);
            }).add(response => {
                this._utility.hideLoader();
                this.hideChildModal();
            })
        }

    }

    update() {
        if (this.work == 'offer') {
            let id = this.quote._id;
            let quotation = this.quote;
            console.log('Quotation : ', JSON.stringify(quotation));
            this._service.postRawOffer(id, quotation).subscribe(data => {
                console.log('Response : ', JSON.stringify(data));
                this._alert.success(data.message);
            }).add(response => {
                this._utility.hideLoader();
                this.hideChildModal();
            })
        } else if (this.work == 'req') {
            let id = this.quote._id;
            let quotation = this.quote;
            console.log('Requirement Quotation: ', JSON.stringify(quotation)); 
            this._service.postRawRequirement(id, quotation).subscribe(data => {
                console.log('Response of Requirement : ', JSON.stringify(data));
                this._alert.success(data.message);
            }).add(response => {
                this._utility.hideLoader();
                this.hideChildModal();
            })
        }

    }

    isNotMobile() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    }
}