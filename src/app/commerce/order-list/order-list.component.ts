import { Component, OnInit, Input } from '@angular/core';
import { CommerceService } from '../commerce.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
	@Input() rid;

  constructor(private commerceServ:CommerceService) { }

  ngOnInit() {
  	let query = '?restaurent_id=' + this.rid;
  	this.commerceServ.getOrderList(query).subscribe(r=>{
  		let k = r;
  	})
  }

}
