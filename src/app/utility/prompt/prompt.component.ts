import { Component, Input, Output, ViewChild, EventEmitter, OnChanges } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';

@Component({
    moduleId: module.id,
    selector: 'app-prompt',
    templateUrl: 'prompt.component.html',
    styleUrls: ['prompt.component.css']
})
export class PromptComponent implements OnChanges {
    @Input() message: string;
    @ViewChild('childModal') public childModal: ModalDirective;
    @Output() event = new EventEmitter<boolean>();

    public showChildModal(): void {
        this.childModal.show();
    }

    public hideChildModal(): void {
        this.childModal.hide();
    }

    promptReturn(): void {
        this.event.emit(true);
        this.childModal.hide();
    }

    ngOnChanges() {
        console.log('inside prompt');
        if (this.message !== '') {
            const num = this.message.search(':');
            this.message = this.message.substring(0, num);
            this.childModal.show();
        }
    }
}
