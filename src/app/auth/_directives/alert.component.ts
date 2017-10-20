import { Component, OnInit } from '@angular/core';

import { AlertService } from '../_services/alert.service';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'alert',
    templateUrl: 'alert.component.html'
})

export class AlertComponent {
    message: any;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.alertService.getMessage().subscribe(message => {

            var type = ['info', 'success', 'warning', 'danger'];

            var color = type[Math.floor((Math.random() * 3) + 1)];

            // var color = 'danger';
            if (message) {
                $.notify({
                    icon: "ti-gift",
                    message: JSON.stringify(message.text)
                }, {
                        type: color,
                        timer: 4000,
                        placement: {
                            from: 'top',
                            align: 'right'
                        }
                    });
            }
        });

    }


}