import { Injectable } from "@angular/core";
import { ConnectionBackend, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers } from "@angular/http";
import { appConfig } from '../app.config';
 
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
 
@Injectable()
export class CustomHttp extends Http {
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }
 
    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        console.log(url, options);
        return super.get(appConfig.apiUrl + url, this.addJwt(options)).catch(this.handleError);
    }
 
    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.post(appConfig.apiUrl + url, body, this.addJwt(options)).catch(this.handleError);
    }
 
    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.put(appConfig.apiUrl + url, body, this.addJwt(options)).catch(this.handleError);
    }
 
    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.delete(appConfig.apiUrl + url, this.addJwt(options)).catch(this.handleError);
    }
 
    // private helper methods
 
    private addJwt(options?: RequestOptionsArgs): RequestOptionsArgs {
        // ensure request options and headers are not null
        options = options || new RequestOptions();
        options.headers = options.headers || new Headers();
 
        // add authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            // options.headers.append('Content-Type', 'application/json; charset=UTF-8');
            // options.headers.append('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
            // options.headers.append('Access-Control-Allow-Origin', '*');
            // options.headers.append('Access-Control-Allow-Headers', 'GET, PUT, POST, DELETE, HEAD, OPTIONS, Origin, X-Requested-With, Content-Type, Accept, x-access-token');
            options.headers.append('x-access-token', currentUser.token);
            console.log(options);
        }
 
        return options;
    }
 
    private handleError(error: any) {
        if (error.status === 401) {
            // 401 unauthorized response so log user out of client
            window.location.href = '/#/login';
        }
 
        return Observable.throw(error._body);
    }
}
 
export function customHttpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
    return new CustomHttp(xhrBackend, requestOptions);
}
 
export let customHttpProvider = {
    provide: Http,
    useFactory: customHttpFactory,
    deps: [XHRBackend, RequestOptions]
};