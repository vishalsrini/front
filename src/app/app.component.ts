import { Component } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
  notLoggedIn() {
        if(localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }
        return false;
    }
}
