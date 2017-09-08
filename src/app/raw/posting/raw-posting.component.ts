import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';

import { RawCashewSchema } from '../../models/raw';
import { MainServiceComponent } from '../../service/main-service.component';

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

    constructor(private _service: MainServiceComponent) {
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
        if(this.editBoolean) {
            this.update();
        } else if (this.work == 'offer') {
            console.log('Quotation : ', JSON.stringify(this.quote));
            this._service.postRawOffers(this.quote).subscribe(data => {
                console.log('Response : ', JSON.stringify(data));
            })
        } else if (this.work == 'req') {
            console.log('Requirement Quotation: ', JSON.stringify(this.quote));
            this._service.postRawRequirements(this.quote).subscribe(data => {
                console.log('Response of Requirement : ', JSON.stringify(data));
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
            })
        } else if (this.work == 'req') {
            let id = this.quote._id;
            let quotation = this.quote;
            console.log('Requirement Quotation: ', JSON.stringify(quotation)); 
            this._service.postRawRequirement(id, quotation).subscribe(data => {
                console.log('Response of Requirement : ', JSON.stringify(data));
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