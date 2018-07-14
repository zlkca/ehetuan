
import { throwError as observableThrowError, Observable } from 'rxjs';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { catchError, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

const APP = environment.APP;
const API_URL = environment.API_URL;

@Injectable()
export class OrderService {

    private API_URL = environment.API_URL;
    private APP = environment.APP;
    MEDIA_URL = environment.APP_URL + '/media/';
    emptyImage = environment.APP_URL + '/media/empty.png';

    constructor(private http: HttpClient) { }

    checkout(orders: any, user_id: string): Observable<boolean> {
        const url = this.API_URL + 'orders';

        return this.http.post(url, {
            // 'id': (d.id? d.id:''),
            'orders': orders, // {pid:x, quantity:number}
            'user_id': user_id
            // 'created': d.created,
            // 'updated': d.updated,
        }).pipe(map((res: any) => {
            return res.success;
        }),
            catchError((err) => {
                return observableThrowError(err.message || err);
            }));
    }

}
