import { SmartComponentLibraryModule, SmartFormComponent, CustomSmartForm, DataSourceRegistry, SmartViewerRegistryService, SmartTabFolderRegistryService, SmartViewManagerService, SmartFormInstanceService, SmartToolbarRegistry, SmartDataSource, WidgetFacadeFactory, SmartDialogService, SmartNavigationService, SmartViewerComponent } from '@consultingwerk/smartcomponent-library';
import { Component, Injector, OnInit, OnDestroy, OnChanges, SimpleChanges, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { first, filter } from 'rxjs/operators';
import { CustomCalendarComponent } from './custom-calendar/custom-calendar.component';
import { CalendarModule } from '@progress/kendo-angular-dateinputs';


@CustomSmartForm('ordersCustomForm')
@Component({
    selector: 'custom-orders-form',
    templateUrl: '../../../../node_modules/@consultingwerk/smartcomponent-library/ui/form/smart-form.component.html',
    viewProviders: [DataSourceRegistry, SmartViewManagerService, SmartFormInstanceService, SmartToolbarRegistry, SmartViewerRegistryService, SmartTabFolderRegistryService]
})
export class CustomOrdersFormComponent extends SmartFormComponent implements OnInit, OnDestroy, OnChanges {

    private ordersDataSource: SmartDataSource;

    constructor(injector: Injector,
                private viewerRegistry: SmartViewerRegistryService,
                private dsRegistry: DataSourceRegistry) {
                    super(injector);
    }

    async ngOnInit() {
        // Add your own initialization logic here
        
        this.setFormConfiguration('/SmartForm/Form/OrderCalendarForm');

        this.dsRegistry.dataSourceAdded.pipe(first(ev => ev.dataSourceName === 'OrderCustomerDataSource'))
            .subscribe(ev => this.ordersDataSource = ev.dataSource);

        this.viewerRegistry.smartViewerAdded.pipe(filter(ev => ev.name === 'OrderViewer'))
            .subscribe((viewer: SmartViewerComponent) => {
                viewer.viewerButtonClicked.pipe(filter(btnInfo => btnInfo.label === 'View Shipping Address'))
                    .subscribe(ev => this.viewShippingAddress(this.ordersDataSource.selected));
            })
        SmartFormComponent.prototype.ngOnInit.call(this);
    }

    viewShippingAddress(order: any) {
        const customer = order.eCustomer[0];
        const adr: string = `${customer.Address}, ${customer.City}, ${customer.Country}`;
        window.open(`https://www.google.com/maps/search/?api=1&query=${adr}`);
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
        CalendarModule,
        SmartComponentLibraryModule
    ],
    declarations: [
        CustomOrdersFormComponent,
        CustomCalendarComponent
    ],
    entryComponents: [
        CustomOrdersFormComponent,
        CustomCalendarComponent
    ]
})
export class CustomOrdersFormModule { }