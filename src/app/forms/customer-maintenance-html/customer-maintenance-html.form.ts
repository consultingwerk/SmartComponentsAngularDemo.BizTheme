import { SmartRouteGuard, SmartComponentLibraryModule, SmartViewerRegistryService, SmartFormComponent, CustomSmartForm, DataSourceRegistry, SmartViewManagerService, SmartFormInstanceService, SmartToolbarRegistry, SmartViewerComponent, SmartDataSource, WidgetFacadeFactory, SmartDialogService, DialogButtons, DataSourceRegistryEventArgs } from '@consultingwerk/smartcomponent-library';
import { Component, Injector, OnInit, OnDestroy, OnChanges, SimpleChanges, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { first, map } from 'rxjs/operators';
import { pipe } from 'rxjs';

@CustomSmartForm('custMntHtml')
@Component({
    selector: 'customer-maintenance-html-form',
    templateUrl: './customer-maintenance-html.form.html',
    styleUrls: ['./customer-maintenance-html.form.css'],
    viewProviders: [DataSourceRegistry, SmartViewManagerService, SmartFormInstanceService, SmartToolbarRegistry, SmartViewerRegistryService]
})
export class CustomerMaintenanceHtmlFormComponent extends SmartFormComponent implements OnInit, OnDestroy, OnChanges {

    private customerDatasource: SmartDataSource;

    constructor(injector: Injector,
        private widgetFactory: WidgetFacadeFactory,
        private dsRegistry: DataSourceRegistry,
        private viewerRegistry: SmartViewerRegistryService,
        private dialogService: SmartDialogService) {
        super(injector);
    }

    async ngOnInit() {
        // Add your own initialization logic here

        super.ngOnInit();

        const customerViewer = await this.viewerRegistry.smartViewerAdded.pipe(first(viewer => viewer.name === 'CustomerViewer')).toPromise();
        customerViewer.inputValueChanged.subscribe(() => {
            this.setStateInputSensitivity();
        });
        const customerDataSource = this.dsRegistry.getDataSource('CustomerDataSource') || 
            await this.dsRegistry.dataSourceAdded.pipe(first(ev => ev.dataSourceName === 'CustomerDataSource'))
                     .pipe(map((event: DataSourceRegistryEventArgs) => event.dataSource)).toPromise();
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
        RouterModule.forChild([{
            path: 'customer-mnt-html',
            component: CustomerMaintenanceHtmlFormComponent,
            canActivate: [SmartRouteGuard],
            outlet: 'view',
            data: {
                BreadcrumbLabelTemplate: 'Customer Maintenance (Static HTML)', 
                BrowserTitleTemplate: 'Customer Maintenance (Static HTML)', 
                FormId: 'custMntHtml'
            }
        }]), 
        SmartComponentLibraryModule
    ],
    declarations: [
        CustomerMaintenanceHtmlFormComponent
    ],
    entryComponents: [
        CustomerMaintenanceHtmlFormComponent
    ],
    exports: [
        RouterModule
    ]
})
export class CustomerMaintenanceHtmlFormModule { }