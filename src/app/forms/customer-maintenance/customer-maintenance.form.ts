import { SmartComponentLibraryModule, SmartViewerRegistryService, SmartFormComponent, CustomSmartForm, DataSourceRegistry, SmartViewManagerService, SmartFormInstanceService, SmartToolbarRegistry, SmartViewerComponent, SmartDataSource, WidgetFacadeFactory, SmartDialogService, DialogButtons, SmartComboEditorComponent, SmartNavigationService, SmartToolbarComponent } from '@consultingwerk/smartcomponent-library';
import { Component, Injector, OnInit, OnDestroy, OnChanges, SimpleChanges, NgModule, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core'
import { CommonModule } from '@angular/common';
import { first, map, filter } from 'rxjs/operators';

@CustomSmartForm('customerForm')
@Component({
    selector: 'customer-maintenance-form',

    templateUrl: '../../../../node_modules/@consultingwerk/smartcomponent-library/ui/form/smart-form.component.html',

    viewProviders: [DataSourceRegistry, SmartViewManagerService, SmartFormInstanceService, SmartToolbarRegistry, SmartViewerRegistryService]
})
export class CustomerMaintenanceFormComponent extends SmartFormComponent implements OnInit, OnDestroy, OnChanges {

   
    protected customerDatasource: SmartDataSource;
    protected customerCountryCombo: SmartComboEditorComponent;

    constructor(injector: Injector,
        private toolbarRegistry: SmartToolbarRegistry,
        private viewerRegistry: SmartViewerRegistryService,
        private dsRegistry: DataSourceRegistry,
        private widgetFactory: WidgetFacadeFactory,
        private dialogService: SmartDialogService,
        private navigationService: SmartNavigationService) {
        super(injector);
    }

    async ngOnInit() {
        // Add your own initialization logic here

        this.setFormConfiguration('/SmartForm/Form/customerForm');

        super.ngOnInit();

        this.viewerRegistry.smartViewerAdded.pipe(first(viewer => viewer.name === 'CustomerViewer'))
            .subscribe(customerViewer => {
                customerViewer.inputValueChanged.subscribe(() => {
                    this.setStateInputSensitivity();
                });
            });

        this.toolbarRegistry.toolbarRegistered.pipe(
            filter(ev => ev.toolbarName === 'DefaultToolbar'),
            map(ev => ev.toolbar)
        ).subscribe((toolbar: SmartToolbarComponent) => {
            toolbar.buttonClicked.subscribe(buttonName => this.handleToolbarButtonClick(buttonName));
            this.customerCountryCombo = toolbar.getComboControl('country-combo');
            this.customerCountryCombo.smartModelChanged.subscribe(value => {
                if (!value || value === '' || value === this.customerDatasource.selected.Country) {
                    return;
                }
                this.customerDatasource.selected.Country = value;
            });

        });

        console.log('got viewer');
        const customerDataSource = this.dsRegistry.getDataSource('CustomerDataSource') || await this.dsRegistry.dataSourceAdded.pipe(
            first(ev => ev.dataSourceName === 'CustomerDataSource'),
            map(ev => ev.dataSource)
        ).toPromise();
        console.log('got data source');
        this.customerDatasource = customerDataSource;
        console.log(this.customerDatasource)
        customerDataSource.selectionChanged.subscribe(selectionEvent => {
            this.customerCountryCombo.ngModel = this.customerDatasource.selected.Country;
            this.setStateInputSensitivity();
        });
        customerDataSource.stateChanged.subscribe(() => {
            this.setStateInputSensitivity();
        });

    }

    private handleToolbarButtonClick(buttonName: string) {
        console.log('button clicked: %s', buttonName);
        switch (buttonName) {
            case 'customer-orders':
                this.navigationService.navigate('customer/:CustNum/orders', {
                    paramMap: {
                        CustNum: this.customerDatasource.selected.CustNum
                    }
                });
                break;
            case 'customer-credithold':
                this.PutCustomerOnHoldHandler(this.customerDatasource.selected);
                break;
        }
    }

    private setStateInputSensitivity() {
        setTimeout(async () => {
            const customerCountryInput = await this.widgetFactory.GetFacade('Country');
            const customerStateInput = await this.widgetFactory.GetFacade('State');

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
        CustomerMaintenanceFormComponent
    ],
    entryComponents: [
        CustomerMaintenanceFormComponent
    ]
})
export class CustomerMaintenanceFormModule { }