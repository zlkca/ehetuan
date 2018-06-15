import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-institution-signup',
  templateUrl: './institution-signup.component.html',
  styleUrls: ['./institution-signup.component.scss']
})
export class InstitutionSignupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  setAddr(obj){
  	let addr = obj.addr;
  	let sAddr = obj.sAddr;

  }
}
