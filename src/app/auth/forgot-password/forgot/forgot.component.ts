import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService } from '../../_services/alert.service';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
    selector: 'app-forgot',
    templateUrl: './forgot.component.html'
})
export class ForgotComponent {
    id: string;
    loading = false;
    model: any = {};
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }

    login() {
        this.loading = true;
        this.authenticationService.forgot(this.model.username)
            .subscribe(
            data => {
                this.alertService.success(data.message);
                this.loading = false;
                this.router.navigate(['\login']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }

    resend() {
        this.loading = true;
        if (this.model.username) {
            this.authenticationService.resend(this.model.username)
                .subscribe(
                data => {
                    this.alertService.success(data.message);
                    this.loading = false;
                    this.router.navigate(['\login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
        } else {
            this.loading = false;
            this.alertService.success("Please Enter Email Id and continue");
        }
    }
}