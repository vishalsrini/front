import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';

@Component({
    selector: 'modal-image',
    templateUrl: './modal-image.component.html',
    styles: [`
    img {width: 100%}
    @media (min-width: 768px) { 
        .modal-dialog {
            margin: 30px 30%;
        }
    }
    
    .modal-body {
        padding: 0px !important;
    }`]
})
export class ModalImage {
    @ViewChild('childModal') public childModal: ModalDirective;
    image: string;

    public showChildModal(image: string): void {
        this.image = image;
        this.childModal.show();
    }

    public hideChildModal(): void {
        this.childModal.hide();
    }

}