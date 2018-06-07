import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { User } from './account';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

const APP = environment.APP;

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

    login(account: string, password: string): Observable<User> {
        const url = this.API_URL + 'login';
        let self = this;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(url, {"account": account, "password": password}, {'headers': headers}).map((res:any) => {
            localStorage.setItem('token-'+APP, res.token);
            if(res.data){
                return new User(res.data);
            }else{
                return null;
            }
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
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
        return this.http.post(url, {"token": token}, {'headers': headers}).map((res:any) => {
            if(res.data){
                return res.data;
            }else{
                return null;
            }
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    signup(username: string, email: string, password: string, type:string): Observable<User> {
        // note: http.post return { token:'x', data: user data }
        const url = this.API_URL + 'signup';
        let self = this;
        let body = {"username": username, "email": email, "password": password, "type":type};
        let headers = new HttpHeaders().set('Content-Type', "application/json");
        return this.http.post(url, body, {'headers': headers}).map((res:any) => {
            localStorage.setItem('token-' + this.APP, res.token);
            if (res.data) {
                return new User(res.data);
            } else {
                return null;
            }
        }).catch((error:any)=>{
            return Observable.throw(error.message || error);
        });
    }


    forgetPassword(email: string) {
        const url = this.API_URL + 'forget-password';
        let headers = new HttpHeaders().set('Content-Type', "application/json");
        let options = {headers: headers};
        return this.http.post(url, {"email": email}, options)
          .map(rsp => {
            
          })
          .catch(err => err);
    }


    changePassword(userId: any, oldPassword: any, newPassword: any) {
        const url = this.API_URL + 'change-password';
        let headers = new HttpHeaders().set('Content-Type', "application/json");
        let options = {headers: headers};
        return this.http.post(url, {"user_id": userId, "old_password": oldPassword, "new_password": newPassword}, options)
          .map(function(rsp: any) {
            // return rsp.errors;
          })
          .catch(err => err);
    }
}
