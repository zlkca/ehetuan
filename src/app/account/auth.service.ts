
import {throwError as observableThrowError } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';

import {map, catchError} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { environment } from '../../environments/environment';
import { User } from './account';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

const APP = environment.APP;
const API_URL = environment.API_URL;

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor() {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let token = localStorage.getItem('token-' + APP);
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': 'Bearer ' + btoa(token)//base 64 encoding
        }
      });
      return next.handle(request);
    }
}

@Injectable()
export class AuthService {

    private API_URL = environment.API_URL;
    private APP = environment.APP;

    constructor(private http: HttpClient) {}

    login(account: string, password: string): Observable<any> {
        const url = this.API_URL + 'login';
        let self = this;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        let data = {"account": account, "password": password};
        return this.http.post(url, data, {'headers': headers}).pipe(map((res:any) => {
            localStorage.setItem('token-'+APP, res.token);
            if(res.data){
                return res.data;
            }else{
                return null;
            }
        }),
        catchError((err) => {
            return observableThrowError(err.message || err);
        }),);
    }

    logout(){
       localStorage.removeItem('token-' + this.APP); 
    }

    hasLoggedIn():Observable<any>{
        let token = localStorage.getItem('token-' + this.APP);
        return this.checkToken(token);
    }

    checkToken(token: string): Observable<any> {
        const url = this.API_URL + 'token';
        let self = this;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(url, {"token": token}, {'headers': headers}).pipe(map((res:any) => {
            if(res.data){
                return res.data;
            }else{
                return null;
            }
        }),
        catchError((err) => {
            return observableThrowError(err.message || err);
        }),);
    }

    signup(username: string, email: string, password: string, type:string): Observable<User> {
        // note: http.post return { token:'x', data: user data }
        const url = this.API_URL + 'signup';
        let self = this;
        let body = {"username": username, "email": email, "password": password, "type":type};
        let headers = new HttpHeaders().set('Content-Type', "application/json");
        return this.http.post(url, body, {'headers': headers}).pipe(map((res:any) => {
            localStorage.setItem('token-' + this.APP, res.token);
            if (res.data) {
                return new User(res.data);
            } else {
                return null;
            }
        }),catchError((error:any)=>{
            return observableThrowError(error.message || error);
        }),);
    }


    institutionSignup(username: string, email: string, password: string, 
        address:any=null, restaurant:string, phone:string, image:any){
        
        let self = this;
        return fromPromise(new Promise((resolve, reject)=>{
            let formData = new FormData();
            formData.append('username', username);
            formData.append('email', email);
            formData.append('password', password);
            //formData.append('address', addr);
            formData.append('restaurant', restaurant);
            formData.append('phone', phone);
            formData.append('image', image.file);
            
            formData.append('street', address.street);
            formData.append('sub_locality', address.sub_locality);
            formData.append('postal_code', address.postal_code);
            formData.append('province', address.province);
            formData.append('city', address.city);
            // formData.append('categories', Array.from(d.categories, x => x.id).join(','));
            formData.append('lat', address.lat);
            formData.append('lng', address.lng);
            
            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function (e) {
              if (xhr.readyState === 4) { // done
                if (xhr.status === 200) { // ok
                    resolve(JSON.parse(xhr.response));
                } else {
                    reject(xhr.response);
                }
              }
            };

            xhr.onerror = function (e) {
                reject(xhr.response);
            };

            xhr.open("POST", API_URL + 'institutionsignup', true);
            xhr.send(formData);
        }));
    }

    forgetPassword(email: string) {
        const url = this.API_URL + 'forget-password';
        let headers = new HttpHeaders().set('Content-Type', "application/json");
        let options = {headers: headers};
        return this.http.post(url, {"email": email}, options).pipe(
          map(rsp => {
            
          }),
          catchError(err => err),);
    }


    changePassword(userId: any, oldPassword: any, newPassword: any) {
        const url = this.API_URL + 'change-password';
        let headers = new HttpHeaders().set('Content-Type', "application/json");
        let options = {headers: headers};
        return this.http.post(url, {"user_id": userId, "old_password": oldPassword, "new_password": newPassword}, options).pipe(
          map(function(rsp: any) {
            // return rsp.errors;
          }),
          catchError(err => err),);
    }
}
