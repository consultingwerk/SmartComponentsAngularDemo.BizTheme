import { SmartComponentLibraryModule, SmartFormComponent, CustomSmartForm, DataSourceRegistry, SmartViewerRegistryService, SmartTabFolderRegistryService, SmartViewManagerService, SmartFormInstanceService, SmartToolbarRegistry, SmartDataSource, SmartComboEditorComponent, WidgetFacadeFactory, SmartDialogService, SmartNavigationService, DialogButtons } from '@consultingwerk/smartcomponent-library';
import { Component, Injector, OnInit, OnDestroy, OnChanges, SimpleChanges, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { first, map } from 'rxjs/operators';


@CustomSmartForm('customerFormAnnotationBased')
@Component({
    selector: 'customer-maintenance-annotations-form',
    templateUrl: '../../../../node_modules/@consultingwerk/smartcomponent-library/ui/form/smart-form.component.html',
    viewProviders: [DataSourceRegistry, SmartViewManagerService, SmartFormInstanceService, SmartToolbarRegistry, SmartViewerRegistryService, SmartTabFolderRegistryService]
})
export class CustomerMaintenanceAnnotationsFormComponent extends SmartFormComponent implements OnInit, OnDestroy, OnChanges {

    protected customerDatasource: SmartDataSource;
    protected customerCountryCombo: SmartComboEditorComponent;
    
    constructor(injector: Injector,
        private viewerRegistry: SmartViewerRegistryService,
        private dsRegistry: DataSourceRegistry,
        private widgetFactory: WidgetFacadeFactory,
        private dialogService: SmartDialogService,
        private navigationService: SmartNavigationService) {
        super(injector);
    }

    async ngOnInit() {
        // Add your own initialization logic here
        
        this.setFormConfiguration('/SmartForm/Form/Consultingwerk.SmartComponentsDemo.OERA.Sports2000.CustomerBusinessEntity/customer');
        
        super.ngOnInit();

        this.viewerRegistry.smartViewerAdded.pipe(first(viewer => viewer.name.toLowerCase() === 'customerviewer'))
        .subscribe(customerViewer => {
            customerViewer.inputValueChanged.subscribe(() => {
                this.setStateInputSensitivity();
            });
        });

        const customerDataSource = this.dsRegistry.getDataSource('customerDataSource') || await this.dsRegistry.dataSourceAdded.pipe(
            first(ev => ev.dataSourceName === 'customerDataSource'),
            map(ev => ev.dataSource)
        ).toPromise();
        this.customerDatasource = customerDataSource;
        customerDataSource.selectionChanged.subscribe(selectionEvent => {
            this.customerDatasource.selected.Name = 'Test';
            this.setStateInputSensitivity();
        });
        customerDataSource.stateChanged.subscribe(() => {
            this.setStateInputSensitivity();
        });

    }


    private setStateInputSensitivity() {
        setTimeout(async () => {
            const customerCountryInput = await this.widgetFactory.GetFacade('customerViewer.eCustomer.Country');
            const customerStateInput = await this.widgetFactory.GetFacade('customerViewer.eCustomer.State');
            if (customerCountryInput.SCREEN_VALUE) {
                customerStateInput.SENSITIVE = customerCountryInput.SCREEN_VALUE.toUpperCase() === 'USA';
            }
            else {
                customerStateInput.SENSITIVE = false;
            }
        });
    }

    async PutCustomerOnHoldHandler(customer: any) {
        const result = await this.dialogService.showDialog({
            buttons: [DialogButtons.YES, DialogButtons.CANCEL],
            textContent: 'Are you sure you want to put this customer on hold?',
            title: 'Confirm'
        });
        if (result.button.value.toLowerCase() === 'yes') {
            await this.customerDatasource.invokeMethod('PutCustomerOnHold', {
                plcParameter: {
                    CustNum: this.customerDatasource.selected.CustNum,
                    Comments: 'Welcome to TypeScript'
                }
            })
            this.customerDatasource.fetch(<any>{
                top: this.customerDatasource.top,
                skip: this.customerDatasource.skipRecords
            });
        }
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
        CustomerMaintenanceAnnotationsFormComponent
    ],
    entryComponents: [
        CustomerMaintenanceAnnotationsFormComponent
    ]
})
export class CustomerMaintenanceAnnotationsFormModule { }