import { SmartComponentLibraryModule, SmartFormComponent, CustomSmartForm, DataSourceRegistry, SmartViewerRegistryService, SmartViewManagerService, SmartFormInstanceService, SmartToolbarRegistry, WidgetFacadeFactory, SmartDialogService, SmartNavigationService } from '@consultingwerk/smartcomponent-library';
import { Component, Injector, OnInit, OnDestroy, OnChanges, SimpleChanges, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { CustomerMaintenanceFormComponent } from '../customer-maintenance/customer-maintenance.form';


@CustomSmartForm('customerOrderForm')
@Component({
    selector: 'customer-order-form',
    templateUrl: '../../../../node_modules/@consultingwerk/smartcomponent-library/ui/form/smart-form.component.html',
    viewProviders: [DataSourceRegistry, SmartViewManagerService, SmartFormInstanceService, SmartToolbarRegistry, SmartViewerRegistryService]
})
export class CustomerOrderFormComponent extends CustomerMaintenanceFormComponent implements OnInit, OnDestroy, OnChanges {

    constructor(injector: Injector,
                toolbarRegistry: SmartToolbarRegistry,
                viewerRegistry: SmartViewerRegistryService,
                dsRegistry: DataSourceRegistry,
                widgetFactory: WidgetFacadeFactory,
                dialogService: SmartDialogService,
                navigationService: SmartNavigationService) {
        super(injector, toolbarRegistry, viewerRegistry, dsRegistry, widgetFactory, dialogService, navigationService);
    }

    async ngOnInit() {
        // Add your own initialization logic here
        
        this.setFormConfiguration('/SmartForm/Form/CustomerOrderForm');
        
        SmartFormComponent.prototype.ngOnInit.call(this);
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
        SmartComponentLibraryModule
    ],
    declarations: [
        CustomerOrderFormComponent
    ],
    entryComponents: [
        CustomerOrderFormComponent
    ]
})
export class CustomerOrderFormModule { }