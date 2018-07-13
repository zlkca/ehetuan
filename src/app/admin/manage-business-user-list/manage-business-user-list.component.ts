import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../account/account.service';

@Component({
    selector: 'app-manage-business-user-list',
    templateUrl: './manage-business-user-list.component.html',
    styleUrls: ['./manage-business-user-list.component.scss']
})
export class ManageBusinessUserListComponent implements OnInit {
    users;

    constructor(private accountSvc: AccountService) { }

    ngOnInit() {
        const self = this;
        self.accountSvc.getUserList('?type=business').subscribe(users => {
            self.users = users;
        });
    }
}
