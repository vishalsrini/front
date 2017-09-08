import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
 
@Injectable()
export class MainServiceComponent {
    constructor(private http: Http) { }

    getUserDetails(): Observable<any[]> {
        return this.http.get('/users/currentUser').map((response: Response) => <any[]>response.json());
    }

    // Raw Cashew 
    getRawOffers(): Observable<any[]> {
        return this.http.get('/offers/raw').map((response: Response) => <any[]>response.json());
    }

    getRawRequirements(): Observable<any[]> {
        return this.http.get('/req/raw').map((response: Response) => <any[]>response.json());
    }

    getRawOffer(): Observable<any> {
        return this.http.get('/offers/users').map((response: Response) => <any>response.json());
    }

    getRawRequirement(): Observable<any> {
        return this.http.get('/req/users').map((response: Response) => <any>response.json());
    }

    postRawOffers(offer): Observable<any[]> {
        return this.http.post('/offers/raw', offer).map((response: Response) => <any[]>response.json());
    }

    postRawRequirements(req): Observable<any[]> {
        return this.http.post('/req/raw', req).map((response: Response) => <any[]>response.json());
    }

    postRawOffer(id, offer): Observable<any[]> {
        delete offer.status;
        delete offer._id;
        delete offer.updatedAt;
        delete offer.createdAt;
        delete offer.__v;
        delete offer.status;
        return this.http.put('/offers/raw/'+id, offer).map((response: Response) => <any[]>response.json());
    }

    postRawRequirement(id, req): Observable<any[]> {
        delete req.status;
        delete req._id;
        delete req.updatedAt;
        delete req.createdAt;
        delete req.__v;
        delete req.status;
        return this.http.put('/req/raw/'+id, req).map((response: Response) => <any[]>response.json());
    }

    // Processed Cashew
    getProcessedOffers(): Observable<any[]> {
        return this.http.get('/offers/processed').map((response: Response) => <any[]>response.json());
    }

    getProcessedRequirements(): Observable<any[]> {
        return this.http.get('/req/processed').map((response: Response) => <any[]>response.json());
    }

    getProcessedOffer(): Observable<any> {
        return this.http.get('/offers/users').map((response: Response) => <any>response.json());
    }

    getProcessedRequirement(): Observable<any> {
        return this.http.get('/req/users').map((response: Response) => <any>response.json());
    }

    postProcessedOffers(offer): Observable<any[]> {
        return this.http.post('/offers/processed', offer).map((response: Response) => <any[]>response.json());
    }

    postProcessedRequirements(req): Observable<any[]> {
        return this.http.post('/req/processed', req).map((response: Response) => <any[]>response.json());
    }

    postProcessedOffer(id, offer): Observable<any[]> {
        delete offer.status;
        delete offer._id;
        delete offer.updatedAt;
        delete offer.createdAt;
        delete offer.__v;
        delete offer.status;
        return this.http.put('/offers/processed/'+id, offer).map((response: Response) => <any[]>response.json());
    }

    postProcessedRequirement(id, req): Observable<any[]> {
        delete req.status;
        delete req._id;
        delete req.updatedAt;
        delete req.createdAt;
        delete req.__v;
        delete req.status;
        return this.http.put('/req/processed/'+id, req).map((response: Response) => <any[]>response.json());
    }

    postNegotiation(negotiate): Observable<any[]> {
        return this.http.post('/negotiate', negotiate).map((response)=> <any>response.json());
    }
}
