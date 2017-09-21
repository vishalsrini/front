import { Component } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
    change: Boolean;
  notLoggedIn() {
        if(localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }
        return false;
    }

    sideBarChange(event) {
        this.change = event;
    }
}
