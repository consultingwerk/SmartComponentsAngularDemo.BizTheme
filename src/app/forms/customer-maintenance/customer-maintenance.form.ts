import { SmartComponentLibraryModule, SmartViewerRegistryService, SmartFormComponent, CustomSmartForm, DataSourceRegistry, SmartViewManagerService, SmartFormInstanceService, SmartToolbarRegistry, SmartViewerComponent, SmartDataSource, WidgetFacadeFactory, SmartDialogService, DialogButtons } from '@consultingwerk/smartcomponent-library';
import { Component, Injector, OnInit, OnDestroy, OnChanges, SimpleChanges, NgModule, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core'
import { CommonModule } from '@angular/common';
import { first, map } from 'rxjs/operators';

@CustomSmartForm('customerForm')
@Component({
    selector: 'customer-maintenance-form',

    templateUrl: '../../../../node_modules/@consultingwerk/smartcomponent-library/ui/form/smart-form.component.html',

    viewProviders: [DataSourceRegistry, SmartViewManagerService, SmartFormInstanceService, SmartToolbarRegistry, SmartViewerRegistryService]
})
export class CustomerMaintenanceFormComponent extends SmartFormComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {

    protected customerDatasource: SmartDataSource;

    constructor(injector: Injector,
        private widgetFactory: WidgetFacadeFactory,
        private dsRegistry: DataSourceRegistry,
        private viewerRegistry: SmartViewerRegistryService,
        private dialogService: SmartDialogService) {
        super(injector);
    }

    async ngOnInit() {
        // Add your own initialization logic here

        //this.setFormConfiguration('frontend://assets/')
        //this.setFormConfiguration('/SmartForm/Form/CustomerForm');
        this.setFormConfiguration('frontend://assets/dev-form.structure.json');
        super.ngOnInit();

        const customerViewer = await this.viewerRegistry.smartViewerAdded.pipe(first(viewer => viewer.name === 'CustomerViewer')).toPromise();
        customerViewer.inputValueChanged.subscribe(() => {
            this.setStateInputSensitivity();
        });
        console.log('got viewer');
        const customerDataSource = this.dsRegistry.getDataSource('CustomerDataSource') || this.dsRegistry.getDataSource('CustomerDataSource') 
            || await this.dsRegistry.dataSourceAdded.pipe(first(ev => ev.dataSourceName === 'CustomerDataSource'))
            .pipe(map(event => event.dataSource)).toPromise();
            console.log('got data source');
        this.customerDatasource = customerDataSource;
        customerDataSource.selectionChanged.subscribe(selectionEvent => {
            this.setStateInputSensitivity();
        });
        customerDataSource.stateChanged.subscribe(() => {
            this.setStateInputSensitivity();
        });
    }

    async ngAfterViewInit() {

    }
    ngOnDestroy() {

        super.ngOnDestroy();
    }

    ngOnChanges(changes: SimpleChanges) {

        super.ngOnChanges(changes);
    }

    private setStateInputSensitivity() {
        setTimeout(async () => {
            const customerCountryInput = await this.widgetFactory.GetFacade('CustomerViewer.eCustomer.Country');
            const customerStateInput = await this.widgetFactory.GetFacade('CustomerViewer.eCustomer.State');

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

}

@NgModule({
    imports: [
        CommonModule,
        SmartComponentLibraryModule
    ],
    declarations: [
        CustomerMaintenanceFormComponent
    ],
    entryComponents: [
        CustomerMaintenanceFormComponent
    ]
})
export class CustomerMaintenanceFormModule { }