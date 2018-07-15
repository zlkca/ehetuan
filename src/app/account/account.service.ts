import { throwError as observableThrowError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { environment } from '../../environments/environment';
import { User } from './account';
import { AccountApi } from '../shared/lb-sdk/services/custom/Account';

const API_URL = environment.API_URL;

@Injectable()
export class AccountService {
    private API_URL = environment.API_URL;

    constructor(private http: HttpClient, private accountApi: AccountApi) { }

    getUserList(query?: string): Observable<User[]> {
        const url = API_URL + 'users' + (query ? query : '');
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, { 'headers': headers }).pipe(map((res: any) => {
            let a: User[] = [];
            if (res.data && res.data.length > 0) {
                for (let i = 0; i < res.data.length; i++) {
                    a.push(new User(res.data[i]));
                }
            }
            return a;
        }),
        catchError((err) => {
            return observableThrowError(err.message || err);
        }), );
    }

    getUser(id: number): Observable<User> {
        const url = this.API_URL + 'users/' + id;
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, { 'headers': headers }).pipe(map((res: any) => {
            return new User(res.data);
        }),
        catchError((err) => {
            return observableThrowError(err.message || err);
        }), );
    }

    saveUser(d: User): Observable<User> {
        const url = this.API_URL + 'user';
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const data = {
            'username': d.username,
            'first_name': d.first_name,
            'last_name': d.last_name,
            'portrait': d.portrait,
            'type': d.type,
        };

        return this.http.post(url, data, { 'headers': headers }).pipe(map((res: any) => {
            return new User(res.data);
        }),
        catchError((err) => {
            return observableThrowError(err.message || err);
        }), );
    }

    public login(username: string, password: string, rememberMe: boolean = true): Observable<any> {
        const credentials = {
            username: username,
            password: password
        };
        return this.accountApi.login(credentials, null, rememberMe);
    }

    public getCurrent(): Observable<any> {
        return this.accountApi.getCurrent({include: 'restaurants'});
    }

    public isAuthenticated(): boolean {
        return this.accountApi.isAuthenticated();
    }

}

