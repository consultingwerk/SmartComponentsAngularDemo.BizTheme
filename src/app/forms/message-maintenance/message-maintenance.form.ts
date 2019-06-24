import { SmartComponentLibraryModule, SmartFormComponent, CustomSmartForm, DataSourceRegistry, SmartViewerRegistryService, SmartTabFolderRegistryService, SmartViewManagerService, SmartFormInstanceService, SmartToolbarRegistry, SmartRouteGuard } from '@consultingwerk/smartcomponent-library';
import { Component, Injector, OnInit, OnDestroy, OnChanges, SimpleChanges, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@CustomSmartForm('messageMaintenance')
@Component({
    selector: 'message-maintenance-form',
    templateUrl: '../../../../node_modules/@consultingwerk/smartcomponent-library/ui/form/smart-form.component.html',
    viewProviders: [DataSourceRegistry, SmartViewManagerService, SmartFormInstanceService, SmartToolbarRegistry, SmartViewerRegistryService, SmartTabFolderRegistryService]
})
export class MessageMaintenanceFormComponent extends SmartFormComponent implements OnInit, OnDestroy, OnChanges {

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        // Add your own initialization logic here

        this.setFormConfiguration('frontend://assets/message-maintenance.layout.json');

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
            path: 'message-maintenance',
            component: MessageMaintenanceFormComponent,
            canActivate: [SmartRouteGuard],
            outlet: 'view',
            data: {

                BrowserTitleTemplate: 'Message Maintenance',
                FormId: 'messageMaintenance'
            }
        }]),
        SmartComponentLibraryModule
    ],
    declarations: [
        MessageMaintenanceFormComponent
    ],
    entryComponents: [
        MessageMaintenanceFormComponent
    ],
    exports: [
        RouterModule
    ]
})
export class MessageMaintenanceFormModule { }