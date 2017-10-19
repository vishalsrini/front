import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
 
import { AlertService } from '../_services/alert.service';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
    selector: 'app-activate',
    templateUrl: './activate.component.html'
})
export class ActivateComponent {
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
 
        // get id to be activated
        this.id = this.route.snapshot.params.id;
        console.log(this.id);
    }

    login() {
        this.loading = true;
        this.authenticationService.activate(this.model.username, this.model.password, this.id)
            .subscribe(
                data => {
                    this.alertService.success(data.status);
                    this.loading = false;
                    this.router.navigate(['\login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}