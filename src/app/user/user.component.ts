import { Component, OnInit } from '@angular/core';
import { MainServiceComponent } from '../service/main-service.component';
import { User } from '../auth/_models/user';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{
    user: any;

    constructor(private service: MainServiceComponent) {
        this.user = new User();
    }
    ngOnInit(){
        this.service.getUserDetails().subscribe(data => {
            this.user = data;
            console.log(this.user);
        })
    }
}
