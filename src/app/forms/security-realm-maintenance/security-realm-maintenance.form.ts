import { SmartComponentLibraryModule, SmartFormComponent, CustomSmartForm, DataSourceRegistry, SmartViewerRegistryService, SmartTabFolderRegistryService, SmartViewManagerService, SmartFormInstanceService, SmartToolbarRegistry, SmartRouteGuard } from '@consultingwerk/smartcomponent-library';
import { Component, Injector, OnInit, OnDestroy, OnChanges, SimpleChanges, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@CustomSmartForm('securityRealmMaintenance')
@Component({
    selector: 'security-realm-maintenance-form',
    templateUrl: '../../../../node_modules/@consultingwerk/smartcomponent-library/ui/form/smart-form.component.html',
    viewProviders: [DataSourceRegistry, SmartViewManagerService, SmartFormInstanceService, SmartToolbarRegistry, SmartViewerRegistryService, SmartTabFolderRegistryService]
})
export class SecurityRealmMaintenanceFormComponent extends SmartFormComponent implements OnInit, OnDestroy, OnChanges {

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        // Add your own initialization logic here

        this.setFormConfiguration('frontend://assets/security-realm-maintenance.layout.json');

        super.ngOnInit();
    }

    ngOnDestroy() {

        super.ngOnDestroy();
    }

    ngOnChanges(changes: SimpleChanges) {

        super.ngOnChanges(changes);
    }
}

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([{
            path: 'security-realm-maintenance',
            component: SecurityRealmMaintenanceFormComponent,
            canActivate: [SmartRouteGuard],
            outlet: 'view',
            data: {

                BrowserTitleTemplate: 'Security Realm Maintenance',
                FormId: 'securityRealmMaintenance'
            }
        }]),
        SmartComponentLibraryModule
    ],
    declarations: [
        SecurityRealmMaintenanceFormComponent
    ],
    entryComponents: [
        SecurityRealmMaintenanceFormComponent
    ],
    exports: [
        RouterModule
    ]
})
export class SecurityRealmMaintenanceFormModule { }