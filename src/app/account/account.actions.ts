import { Injectable } from '@angular/core';
import { Action } from 'redux';

export class AccountActions{
	static LOGIN = 'LOGIN';
	static LOGOUT = 'LOGOUT'
}

export interface IAccount{
	id:string;
    username:string;
    email:string;
    type:string;
    restaurant_id:string;
}
