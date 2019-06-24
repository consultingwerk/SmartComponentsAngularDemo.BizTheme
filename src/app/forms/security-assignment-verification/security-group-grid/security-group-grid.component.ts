import { Component, OnInit } from "@angular/core";
import { SmartCustomComponent } from '@consultingwerk/smartcomponent-library';
import { CheckRestrictedService } from '../check-restricted.service';
import { IGridGroup } from '../lookup-configuration';


@SmartCustomComponent('securityGroupGrid')
@Component({
    selector: 'security-grid',
    templateUrl: './security-group-grid.component.html',
    styleUrls: [
        './security-group-grid.component.css'
    ]
})
export class SecurityGroupGridComponent implements OnInit {
    public gridData: IGridGroup[] = [];

    constructor(
        private checkRestrictedService: CheckRestrictedService
    ) {}

    ngOnInit() {
        this.checkRestrictedService.checkData.subscribe(data => {
            this.gridData = [];

            data.Groups.map(group => {
                let row: IGridGroup = {
                    Order: data.Groups.indexOf(group) + 1, 
                    GroupName: group.GroupName,
                    LoginCompany: group.LoginCompanyName || ""
                };

                this.gridData.push(row);
            })
        })
    }

}