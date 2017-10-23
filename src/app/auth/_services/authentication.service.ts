import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
 
@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }
 
    login(username: string, password: string) {
        return this.http.post('/users/login', { username: username, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
 
                return user;
            });
    }

    activate(username: string, password: string, id: string) {
        return this.http.post('/users/activate/'+id, { username: username, password: password })
            .map((response: Response) => {
                return response.json();
            })
    }

    forgotPassword(username: string, password: string, id: string) {
        return this.http.post('/users/forgotPassword/'+id, { username: username, password: password })
            .map((response: Response) => {
                return response.json();
            })
    }

    forgot(username: string) {
        return this.http.post('/users/forgot/', { username: username })
            .map((response: Response) => {
                return response.json();
            })
    }

    resend(username: string) {
        return this.http.post('/users/resend/', { username: username })
            .map((response: Response) => {
                return response.json();
            })
    }
 
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}