import { Component, OnInit, Input } from '@angular/core';
import { CommerceService } from '../../commerce/commerce.service';

@Component({
    selector: 'app-manage-order-list',
    templateUrl: './manage-order-list.component.html',
    styleUrls: ['./manage-order-list.component.scss']
})
export class ManageOrderListComponent implements OnInit {
    @Input() orders;

    constructor(private commerceServ: CommerceService) { }

    ngOnInit() {

    }

    getTotal(order) {
        let total = 0;
        for (const item of order.items) {
            total += parseFloat(item.price) * parseInt(item.quantity, 10);
        }
        return total.toFixed(2);
    }

}

