import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UtilityService } from './utility-service.component';
import 'rxjs/add/operator/map'

@Injectable()
export class MainServiceComponent {
    constructor(private http: Http, private _utility: UtilityService) { }

    // gathering user details
    getUserDetails(): Observable<any[]> {
        this._utility.showLoader();
        return this.http.get('/users/currentUser').map((response: Response) => {
            this._utility.hideLoader();
            return <any[]>response.json()
        });
    }

    // Updating user details
    updateUserDetails(userDetails): Observable<any> {
        this._utility.showLoader();
        return this.http.post('/users/updateUser', userDetails).map(response => {
            this._utility.hideLoader();
            return <any>response.json()
        });
    }

    // Raw Cashew 
    getRawOffers(): Observable<any[]> {
        this._utility.showLoader();
        return this.http.get('/offers/raw').map((response: Response) => {
            this._utility.hideLoader();
            return <any[]>response.json()
        });
    }

    getRawRequirements(): Observable<any[]> {
        this._utility.showLoader();
        return this.http.get('/req/raw').map((response: Response) => {
            this._utility.hideLoader();
            return <any[]>response.json()
        });
    }

    getRawOffer(): Observable<any> {
        this._utility.showLoader();
        return this.http.get('/offers/users').map((response: Response) => {
            this._utility.hideLoader();
            return <any>response.json()
        });
    }

    getRawRequirement(): Observable<any> {
        this._utility.showLoader();
        return this.http.get('/req/users').map((response: Response) => {
            this._utility.hideLoader();
            return <any>response.json()
        });
    }

    postRawOffers(offer): Observable<any> {
        this._utility.showLoader();
        return this.http.post('/offers/raw', offer).map((response: Response) => {
            this._utility.hideLoader();
            return <any[]>response.json()
        });
    }

    postRawRequirements(req): Observable<any> {
        this._utility.showLoader();
        return this.http.post('/req/raw', req).map((response: Response) => {
            this._utility.hideLoader();
            return <any[]>response.json()
        });
    }

    postRawOffer(id, offer): Observable<any> {
        this._utility.showLoader();
        delete offer.status;
        delete offer._id;
        delete offer.updatedAt;
        delete offer.createdAt;
        delete offer.__v;
        delete offer.status;
        return this.http.put('/offers/raw/' + id, offer).map((response: Response) => {
            this._utility.hideLoader();
            return <any[]>response.json()
        });
    }

    postRawRequirement(id, req): Observable<any> {
        this._utility.showLoader();
        delete req.status;
        delete req._id;
        delete req.updatedAt;
        delete req.createdAt;
        delete req.__v;
        delete req.status;
        return this.http.put('/req/raw/' + id, req).map((response: Response) => {
            this._utility.hideLoader();
            return <any[]>response.json()
        });
    }

    // Processed Cashew
    getProcessedOffers(): Observable<any[]> {
        this._utility.showLoader();
        return this.http.get('/offers/processed').map((response: Response) => {
            this._utility.hideLoader();
            return <any[]>response.json()
        });
    }

    getProcessedRequirements(): Observable<any[]> {
        this._utility.showLoader();
        return this.http.get('/req/processed').map((response: Response) => {
            this._utility.hideLoader();
            return <any[]>response.json()
        });
    }

    getProcessedOffer(): Observable<any> {
        this._utility.showLoader();
        return this.http.get('/offers/users').map((response: Response) => {
            this._utility.hideLoader();
            return <any>response.json()
        });
    }

    getProcessedRequirement(): Observable<any> {
        this._utility.showLoader();
        return this.http.get('/req/users').map((response: Response) => {
            this._utility.hideLoader();
            return <any>response.json()
        });
    }

    postProcessedOffers(offer): Observable<any> {
        this._utility.showLoader();
        return this.http.post('/offers/processed', offer).map((response: Response) => {
            this._utility.hideLoader();
            return <any>response.json()
        });
    }

    postProcessedRequirements(req): Observable<any> {
        this._utility.showLoader();
        return this.http.post('/req/processed', req).map((response: Response) => {
            this._utility.hideLoader();
            return <any>response.json()
        });
    }

    postProcessedOffer(id, offer): Observable<any> {
        this._utility.showLoader();
        delete offer.status;
        delete offer._id;
        delete offer.updatedAt;
        delete offer.createdAt;
        delete offer.__v;
        delete offer.status;
        return this.http.put('/offers/processed/' + id, offer).map((response: Response) => {
            this._utility.hideLoader();
            return <any>response.json()
        });
    }

    postProcessedRequirement(id, req): Observable<any> {
        this._utility.showLoader();
        delete req.status;
        delete req._id;
        delete req.updatedAt;
        delete req.createdAt;
        delete req.__v;
        delete req.status;
        return this.http.put('/req/processed/' + id, req).map((response: Response) => {
            this._utility.hideLoader();
            return <any>response.json()
        });
    }

    postNegotiation(action, type, negotiate): Observable<any> {
        this._utility.showLoader();
        return this.http.post('/negotiate/'+action+'/'+type, negotiate).map((response) => {
            this._utility.hideLoader();
            return <any>response.json()
        });
    }

    getNegotiationList(action, type): Observable<any> {
        this._utility.showLoader();
        return this.http.get('/negotiate/' + action + '/' + type).map((response) => {
            this._utility.hideLoader();
            console.log(response);
            return <any>response.json()
        })
    }
}
