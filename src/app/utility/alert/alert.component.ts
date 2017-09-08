import { Component, ViewChild, Input, OnChanges } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';

@Component({
    moduleId: module.id,
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponentU implements OnChanges {
    @Input() message: string;
    @ViewChild('childModal') public childModal: ModalDirective;

    public showChildModal(): void {
        this.childModal.show();
    }

    public hideChildModal(): void {
        this.childModal.hide();
    }

    ngOnChanges() {
        console.log('inside');
        if (this.message !== '') {
            const num = this.message.search(':');
            this.message = this.message.substring(0, num);
            this.childModal.show();
        }
    }

    alert(message: string) {
        this.message = message;
        this.childModal.show();
    }
}
