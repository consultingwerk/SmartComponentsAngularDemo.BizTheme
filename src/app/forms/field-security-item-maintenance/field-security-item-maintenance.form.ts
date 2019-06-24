import { SmartComponentLibraryModule, SmartFormComponent, CustomSmartForm, DataSourceRegistry, SmartViewerRegistryService, SmartTabFolderRegistryService, SmartViewManagerService, SmartFormInstanceService, SmartToolbarRegistry, SmartRouteGuard } from '@consultingwerk/smartcomponent-library';
import { Component, Injector, OnInit, OnDestroy, OnChanges, SimpleChanges, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@CustomSmartForm('fieldSecurityItemMaintenance')
@Component({
    selector: 'field-security-item-maintenance-form',
    templateUrl: '../../../../node_modules/@consultingwerk/smartcomponent-library/ui/form/smart-form.component.html',
    viewProviders: [DataSourceRegistry, SmartViewManagerService, SmartFormInstanceService, SmartToolbarRegistry, SmartViewerRegistryService, SmartTabFolderRegistryService]
})
export class FieldSecurityItemMaintenanceFormComponent extends SmartFormComponent implements OnInit, OnDestroy, OnChanges {

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        // Add your own initialization logic here
        
        this.setFormConfiguration('frontend://assets/security-item-maintenance.layout.json');
        
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
            path: 'field-security-item-maintenance',
            component: FieldSecurityItemMaintenanceFormComponent,
            canActivate: [SmartRouteGuard],
            outlet: 'view',
            data: {
                
                BrowserTitleTemplate: 'Field Security Item Maintenance', 
                FormId: 'fieldSecurityItemMaintenance'
            }
        }]), 
        SmartComponentLibraryModule
    ],
    declarations: [
        FieldSecurityItemMaintenanceFormComponent
    ],
    entryComponents: [
        FieldSecurityItemMaintenanceFormComponent
    ],
    exports: [
        RouterModule
    ]
})
export class FieldSecurityItemMaintenanceFormModule { }