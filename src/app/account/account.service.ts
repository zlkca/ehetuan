import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';
import { User } from './account';

@Injectable()
export class AccountService {
    private API_URL = environment.API_URL;

    constructor(private http:HttpClient){ }

    getUserList(query?:string):Observable<User[]>{
        const url = this.API_URL + 'user' + query ? query:'';
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, {'headers': headers}).map((res:any) => {
            let a:User[] = [];
            if( res.data && res.data.length > 0){
                for(var i=0; i<res.data.length; i++){
                    a.push(new User(res.data[i]));
                }
            }
            return a;
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    getUser(id:number):Observable<User>{
        const url = this.API_URL + 'user/id';
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, {'headers': headers}).map((res:any) => {
            return new User(res.data);
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    saveUser(d:User):Observable<User>{
        const url = this.API_URL + 'user';
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        let data = {
          'username': d.username,
          'first_name': d.first_name,
          'last_name': d.last_name,
          'portrait': d.portrait,
          'type': d.type,
        }
        return this.http.post(url, data, {'headers': headers}).map((res:any) => {
            return new User(res.data);
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

}

