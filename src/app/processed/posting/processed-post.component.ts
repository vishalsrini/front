import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';

import { ProcessedCashewSchema } from '../../models/processed';
import { MainServiceComponent } from '../../service/main-service.component';

declare var $: any;

@Component({
    selector: 'processed-post',
    templateUrl: './processed-post.component.html',
    styles: ['.row { margin-left: auto; margin-right: auto } .checkbox input[type="checkbox"], .radio input[type="radio"] { opacity: 1 !important } ']
})
export class ProcessedPost {
    @ViewChild('childModal') public childModal: ModalDirective;
    private base64textString:String="";
    header: String = '';
    work: String;
    quote: ProcessedCashewSchema;
    step: Number = 1;
    editBoolean: Boolean;
    image: any;

    constructor(private _service: MainServiceComponent) {
        this.quote = new ProcessedCashewSchema();
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

    handleFileSelect(evt){
      var files = evt.target.files;
      var file = files[0];
    
    if (files && file) {
        var reader = new FileReader();

        reader.onload =this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);
    }
  }
  
  _handleReaderLoaded(readerEvt) {
     var binaryString = readerEvt.target.result;
            this.base64textString= btoa(binaryString);
            console.log(btoa(binaryString));
    }


    save() {
        if(this.editBoolean) {
            this.update();
        } else if (this.work == 'offer') {
            console.log('Quotation : ', JSON.stringify(this.quote));
            this.quote['image'] = this.base64textString;
            this._service.postProcessedOffers(this.quote).subscribe(data => {
                console.log('Response : ', JSON.stringify(data));
            })
        } else if (this.work == 'req') {
            console.log('Requirement Quotation: ', JSON.stringify(this.quote));
            this._service.postProcessedRequirements(this.quote).subscribe(data => {
                console.log('Response of Requirement : ', JSON.stringify(data));
            })
        }

    }

    update() {
        if (this.work == 'offer') {
            let id = this.quote._id;
            this.quote['image'] = this.base64textString;
            let quotation = this.quote;
            console.log('Quotation : ', JSON.stringify(quotation));
            this._service.postProcessedOffer(id, quotation).subscribe(data => {
                console.log('Response : ', JSON.stringify(data));
            })
        } else if (this.work == 'req') {
            let id = this.quote._id;
            let quotation = this.quote;
            console.log('Requirement Quotation: ', JSON.stringify(quotation)); 
            this._service.postProcessedRequirement(id, quotation).subscribe(data => {
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