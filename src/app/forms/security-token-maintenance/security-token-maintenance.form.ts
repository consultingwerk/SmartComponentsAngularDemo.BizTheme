import { SmartComponentLibraryModule, SmartFormComponent, CustomSmartForm, DataSourceRegistry, SmartViewerRegistryService, SmartTabFolderRegistryService, SmartViewManagerService, SmartFormInstanceService, SmartToolbarRegistry, SmartRouteGuard } from '@consultingwerk/smartcomponent-library';
import { Component, Injector, OnInit, OnDestroy, OnChanges, SimpleChanges, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@CustomSmartForm('securityTokenMaintenance')
@Component({
    selector: 'security-token-maintenance-form',
    templateUrl: '../../../../node_modules/@consultingwerk/smartcomponent-library/ui/form/smart-form.component.html',
    viewProviders: [DataSourceRegistry, SmartViewManagerService, SmartFormInstanceService, SmartToolbarRegistry, SmartViewerRegistryService, SmartTabFolderRegistryService]
})
export class SecurityTokenMaintenanceFormComponent extends SmartFormComponent implements OnInit, OnDestroy, OnChanges {

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        // Add your own initialization logic here
        
        this.setFormConfiguration('frontend://assets/security-token-maintenance.layout.json');
        
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
        SmartComponentLibraryModule,
        RouterModule.forChild([{
            path: 'security-token-maintenance',
            canActivate: [SmartRouteGuard],
            outlet: 'view',
            component: SecurityTokenMaintenanceFormComponent,
            data: {
                BrowserTitleTemplate: 'Security Token Maintenance',
                FormId: 'securityTokenMaintenance'
            }
        }])
    ],
    declarations: [
        SecurityTokenMaintenanceFormComponent
    ],
    entryComponents: [
        SecurityTokenMaintenanceFormComponent
    ],
    exports: [
        RouterModule
    ]
})
export class SecurityTokenMaintenanceFormModule { }