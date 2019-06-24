import { SmartComponentLibraryModule, SmartFormComponent, CustomSmartForm, DataSourceRegistry, SmartViewerRegistryService, SmartTabFolderRegistryService, SmartViewManagerService, SmartFormInstanceService, SmartToolbarRegistry, SmartRouteGuard, SmartDataSource, WidgetFacadeFactory, InputChangedEventArgs, SmartHttpService, SmartConfig, SmartFrameRegistryService, SmartLookupComponent, SmartFrameComponent, SessionContext, SmartSessionManagerService } from '@consultingwerk/smartcomponent-library';
import { Component, Injector, OnInit, OnDestroy, OnChanges, SimpleChanges, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { ISecurityItemLookupConfiguration, IAssignmentConfiguration } from './lookup-configuration';
import { SecurityGroupGridComponent } from './security-group-grid/security-group-grid.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { CheckRestrictedService } from './check-restricted.service';
import { zip } from 'rxjs';

@CustomSmartForm('authorizationAssignmentVerificationForm')
@Component({
    selector: 'security-assignment-verification-form',
    templateUrl: '../../../../node_modules/@consultingwerk/smartcomponent-library/ui/form/smart-form.component.html',
    viewProviders: [DataSourceRegistry, SmartViewManagerService, SmartFormInstanceService, SmartToolbarRegistry, SmartViewerRegistryService, SmartTabFolderRegistryService]
})
export class SecurityAssignmentVerificationFormComponent extends SmartFormComponent implements OnInit, OnDestroy, OnChanges {
    private securityItemSelected = false;
    private userSelected = false;

    private realmGuid = "";
    private securityItemGuid = "";
    private userGuid = "";

    constructor(injector: Injector,
        private widgetFactory: WidgetFacadeFactory,
        private dsRegistry: DataSourceRegistry,
        private frameRegistry: SmartFrameRegistryService,
        private viewerRegistry: SmartViewerRegistryService,
        private sessionService: SmartSessionManagerService,
        private checkRestrictedService: CheckRestrictedService
    ) {
        super(injector);
    }

    ngOnInit() {
        // Add your own initialization logic here

        this.setFormConfiguration('frontend://assets/authorization-assignment-verification.layout.json');

        super.ngOnInit();
    }

    ngOnDestroy() {

        super.ngOnDestroy();
    }

    ngOnChanges(changes: SimpleChanges) {

        super.ngOnChanges(changes);
    }

    async ngAfterViewInit() {
        this.sessionService.sessionContext.subscribe(session => {
            this.widgetFactory.GetFacade('AuthorizationViewer1.UserName')
                .then(facade => {
                    const userLookup = facade.getComponentInstance<SmartLookupComponent>();
                    userLookup.getDataSource().subscribe(ds => {
                        ds.filter =
                            [{
                                logic: 'or',
                                filters: [
                                    {
                                        field: 'LoginCompanyGuid',
                                        operator: 'eq',
                                        value: session.LoginCompanyKey
                                    },
                                    {
                                        field: 'LoginCompanyGuid',
                                        operator: 'eq',
                                        value: ''
                                    }
                                ]
                            }];
                    });
                });
        });

        this.frameRegistry.getSmartFrameInstance("AuthorizationViewer1")
            .pipe(
                switchMap(viewer => viewer.inputValueChanged),
                filter((changeEvent: InputChangedEventArgs) => changeEvent.inputId === "AuthorizationViewer1.SecurityRealmGuid"),
                switchMap(securityRealmGuid => {
                    this.realmGuid = securityRealmGuid.inputValue;

                    let httpParams: HttpParams = new HttpParams({
                        fromObject: {
                            Value: securityRealmGuid.inputValue
                        }
                    });
                    return this.http.get<ISecurityItemLookupConfiguration>(`${this.smartConfig.serviceURI}/web/Entities/SmartFramework/GetSecurityRealmItemLookup`, {
                        params: httpParams
                    })
                })
            )
            .subscribe(async res => {

                const lookupWidget = await this.widgetFactory.GetFacade('AuthorizationViewer1.SecurityItemDescription');
                const lookup = lookupWidget.getComponentInstance<SmartLookupComponent>();

                lookup.dialogTitle = res.LookupDialogTitle;
                lookup.businessEntity = res.LookupEntityName;
                lookup.table = res.LookupEntityTable;
                lookup.keyField = res.LookupKeyField;
                lookup.keyValueField = res.LookupKeyValueColumn;
                lookup.selectionBoundFields = [res.LookupKeyValueColumn, res.LookupKeyField].join(',');
                lookup.boundFields = [res.LookupKeyValueColumn, res.LookupKeyField].join(',');

                const lookupColumns = res.LookupBrowserFields.split(",").map(val => {
                    return { field: val };
                })

                lookup.smartGridLayout = {
                    columns: lookupColumns,
                    height: 400,
                    scrollable: "scrollable",
                    filterable: "row",
                    pageable: {
                        pageSize: 10,
                        pageSizes: [10, 20, 30]
                    }
                }

                lookup.reInitDatasource();
                this.securityItemSelected = false;
                this.userSelected = false;
            })

        this.widgetFactory.GetFacade('AuthorizationViewer1.SecurityItemDescription').then(facade => {
            const lookup = facade.getComponentInstance<SmartLookupComponent>();
            lookup.smartModelChange.subscribe(() => {
                this.securityItemSelected = true;
                this.securityItemGuid = lookup.keyValueModel;
                this.checkAssignments();
            });
        })

        this.widgetFactory.GetFacade('AuthorizationViewer1.UserName').then(facade => {
            const lookup = facade.getComponentInstance<SmartLookupComponent>();
            lookup.smartModelChange.subscribe(() => {
                this.userSelected = true;
                this.userGuid = lookup.keyValueModel;
                this.checkAssignments();
            });
        })
    }

    public checkAssignments() {

        if (this.securityItemSelected && this.userSelected) {

            const bigObs = zip(this.checkRestrictedService.getCheckIfRestricted(this.realmGuid, this.securityItemGuid, this.userGuid),
                this.frameRegistry.getSmartFrameInstance("AuthorizationViewer2"));

            bigObs.subscribe(results => {
                let data: IAssignmentConfiguration = results[0];
                let frame: SmartFrameComponent = results[1];

                frame.value.IsRestricted = data.IsRestricted;
                frame.value.Reason = data.Reason;
                frame.value.Runtime = data.Runtime + " msec";

            })
        }
    }
}

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([{
            path: 'authorization-assignment-verification',
            component: SecurityAssignmentVerificationFormComponent,
            canActivate: [SmartRouteGuard],
            outlet: 'view',
            data: {
                BreadcrumbLabelTemplate: 'Authorization Assignment Verification',
                BrowserTitleTemplate: 'Authorization Assignement Verification',
                FormId: 'authorizationAssignmentVerificationForm'
            }
        }]),
        SmartComponentLibraryModule,
        GridModule
    ],
    declarations: [
        SecurityAssignmentVerificationFormComponent,
        SecurityGroupGridComponent
    ],
    entryComponents: [
        SecurityAssignmentVerificationFormComponent,
        SecurityGroupGridComponent
    ],
    exports: [
        RouterModule
    ],
    providers: [CheckRestrictedService]
})
export class SecurityAssignmentVerificationFormModule { }