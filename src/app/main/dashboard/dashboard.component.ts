import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	form:FormGroup = new FormGroup({
		name: new FormControl('', [Validators.required, Validators.minLength(3)]),
	});
	get name(){
		return this.form.get('name');
	}
  constructor() { }

  ngOnInit() {
  }

  submit(){

  }
}
