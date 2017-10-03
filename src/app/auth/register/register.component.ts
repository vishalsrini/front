import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from '../_services/alert.service';
import { UserService } from '../_services/user.service';

import { User } from '../_models/user';

declare var window;
@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html',
    styles: [`.card form [class*="col-"]:first-child{padding-left:6px;}`]
})

export class RegisterComponent {
    loading = false;
    private cpassword: string;
    private reg: User;
    private base64textString: String = "";
    step: Number = 1;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) {
        this.reg = new User();
    }

    register() {
        this.loading = true;
        this.userService.create(this.reg)
            .subscribe(
            data => {
                this.alertService.success('Registration successful', true);
                this.router.navigate(['/login']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }

    handleFileSelect(evt) {

        var files = evt.target.files;
        var file;

        var resize = new window.resize();
        resize.init();

        resize.photo(files[0], 100, 'dataURL', (thumbnail) => {
            file = thumbnail;  
            console.log(file); 
            this.reg.image = file;
        });

        // if (files && file) {
        //     var reader = new FileReader();
        //     reader.onload = this._handleReaderLoaded.bind(evt);
        //     reader.readAsBinaryString(file);
        // }
    }

    // _handleReaderLoaded(readerEvt) {
    //     var binaryString = readerEvt.target.result;
    //     this.base64textString = btoa(binaryString);
    //     this.reg.image = this.base64textString;
    //     // console.log(btoa(binaryString));
    // }
}