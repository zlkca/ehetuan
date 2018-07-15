import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from '../order.service';
import { Order } from '../order';

@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.component.html',
    styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
    order: Order;

    @Input() orderId: number;

    constructor(
        private orderServ: OrderService,
    ) { }

    ngOnInit() {
        this.orderServ.getOrder(this.orderId)
            .subscribe((data: Order) => {
                this.order = data;
            });
    }

}
