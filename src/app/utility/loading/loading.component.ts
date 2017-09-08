import { Component } from '@angular/core';
import { UtilityService } from 'app/service/utility-service.component';

@Component({
    moduleId: module.id,
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
    isLoading: boolean; // Boolean set to start loader

    // Constructor to use utility service for screen loading
    constructor(private _loading: UtilityService) {
        this._loading.startLoader.subscribe((loading) => {
            this.isLoading = loading;
        });
    }
}
