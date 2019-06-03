import {
    SmartComponentLibraryModule,
    SmartFrameRegistryService,
    SmartFormComponent,
    CustomSmartForm,
    DataSourceRegistry,
    SmartViewerRegistryService,
    SmartTabFolderRegistryService,
    SmartViewManagerService,
    SmartFormInstanceService,
    SmartToolbarRegistry,
    SmartRouteGuard,
    WidgetFacadeFactory
} from '@consultingwerk/smartcomponent-library';
import { Component, Injector, OnInit, OnDestroy, OnChanges, SimpleChanges, NgModule, ViewChild, AfterViewInit } from '@angular/core'
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@CustomSmartForm('calculatorForm')
@Component({
    selector: 'calculator-form',
    templateUrl: '../../../../node_modules/@consultingwerk/smartcomponent-library/ui/form/smart-form.component.html',
    viewProviders: [
        DataSourceRegistry,
        SmartViewManagerService,
        SmartFormInstanceService,
        SmartToolbarRegistry,
        SmartViewerRegistryService,
        SmartTabFolderRegistryService,
        SmartFrameRegistryService
    ]
})
export class CalculatorFormComponent extends SmartFormComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {

    public calculatorObject: any = {};

    constructor(injector: Injector,
        private frameRegistry: SmartFrameRegistryService,
        private widgetFactory: WidgetFacadeFactory) {
        super(injector);
    }

    ngOnInit() {
        // Add your own initialization logic here

        this.setFormConfiguration('frontend://assets/calculator-form.json');

        super.ngOnInit();
    }

    ngOnDestroy() {

        super.ngOnDestroy();
    }

    ngOnChanges(changes: SimpleChanges) {

        super.ngOnChanges(changes);
    }

     ngAfterViewInit() {
        this.frameRegistry.getSmartFrameInstance('CalculatorViewer')
            .subscribe(calculatorFrame => {
                console.log(calculatorFrame);
                calculatorFrame.value = this.calculatorObject;
                calculatorFrame.frameButtonClicked.subscribe(ev => {
                    this.handleButtonClick(ev);
                });
                calculatorFrame.valueChange.subscribe(() => {
                    console.log(this.calculatorObject);
                });
            });
    }

    private async handleButtonClick({ label }) {
        const resultWidget = await this.widgetFactory.GetFacade('CalculatorViewer.Result');
        const value1 = parseFloat(this.calculatorObject.Value1);
        const value2 = parseFloat(this.calculatorObject.Value2);

        switch (label) {
            case 'Add':
                resultWidget.SCREEN_VALUE = (value1 + value2) + '';
                break;
            case 'Multiplicate':
                resultWidget.SCREEN_VALUE = (value1 * value2) + '';
        }
    }
}

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([{
            path: 'calculator',
            component: CalculatorFormComponent,
            canActivate: [SmartRouteGuard],
            outlet: 'view',
            data: {
                BreadcrumbLabelTemplate: 'Calculator',
                BrowserTitleTemplate: 'Calculator',
                FormId: 'calculatorForm'
            }
        }]),
        SmartComponentLibraryModule
    ],
    declarations: [
        CalculatorFormComponent
    ],
    entryComponents: [
        CalculatorFormComponent
    ],
    exports: [
        RouterModule
    ]
})
export class CalculatorFormModule { }