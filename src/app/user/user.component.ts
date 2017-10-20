import { Component, OnInit } from '@angular/core';
import { MainServiceComponent } from '../service/main-service.component';
import { UtilityService } from '../service/utility-service.component';
import { AlertService } from '../auth/_services/alert.service';
import { User } from '../auth/_models/user';
import { UpdateUser } from '../auth/_models/updateUser'; 

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{
    user: any;
    update: UpdateUser;

    constructor(private service: MainServiceComponent, private _utility: UtilityService,
        private _alert: AlertService) {
        this.user = new User();
        this.update = new UpdateUser();
    }
    ngOnInit(){
        this.service.getUserDetails().subscribe(data => {
            this.user = data;
            console.log(this.user);
        })
    }

    updateUserDetails() {
        this._utility.showLoader();
        this.update.about = this.user.about;
        this.update.addressLine1 = this.user.addressLine1;
        this.update.addressLine2 = this.user.addressLine2;
        this.update.city = this.user.city;
        this.update.companyName = this.user.companyName;
        this.update.companyType = this.user.companyType;
        this.update.country = this.user.country;
        this.update.image = this.user.image;
        this.update.name = this.user.name;
        this.update.phone = this.user.phone;
        this.update.postalCode = this.user.postalCode;
        this.update.region = this.user.region;
        this.update.registrationNumber = this.user.registrationNumber;
        console.log("Items to be updated - ", JSON.stringify(this.update));
        this.service.updateUserDetails(this.update).subscribe(response => {
            console.log(response);
            this._alert.success(response.message);
            this._utility.hideLoader();
        })
    }
}
