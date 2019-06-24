import { SmartHttpService, SmartConfig } from '@consultingwerk/smartcomponent-library';
import { HttpParams } from '@angular/common/http';
import { IAssignmentConfiguration } from './lookup-configuration';
import { ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class CheckRestrictedService {
    public checkData: ReplaySubject<IAssignmentConfiguration> = new ReplaySubject(1);

    constructor(
        private http: SmartHttpService,
        private smartConfig: SmartConfig
    ) {}

    public getCheckIfRestricted(realmGuid: string, securityItemGuid: string, userGuid: string) {
        let httpParams: HttpParams = new HttpParams({
            fromObject: {
                RealmGuid: realmGuid,
                SecurityItemGuid: securityItemGuid,
                UserGuid: userGuid
            }
        });
        return this.http.get<IAssignmentConfiguration>(`${this.smartConfig.serviceURI}/web/Entities/SmartFramework/IsRestrictedCheck`, {
            params: httpParams
        }).pipe(tap(data => {
            this.checkData.next(data);
        }));
    }
}
