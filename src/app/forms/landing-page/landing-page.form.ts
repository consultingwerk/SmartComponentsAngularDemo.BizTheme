import { SmartComponentLibraryModule, SmartFormComponent, CustomSmartForm, DataSourceRegistry, SmartViewerRegistryService, SmartTabFolderRegistryService, SmartViewManagerService, SmartFormInstanceService, SmartToolbarRegistry, SmartRouteGuard } from '@consultingwerk/smartcomponent-library';
import { Component, Injector, OnInit, OnDestroy, OnChanges, SimpleChanges, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@CustomSmartForm('landingPage')
@Component({
    selector: 'landing-page-form',
    templateUrl: './landing-page.form.html',
    styleUrls: ['./landing-page.form.css'],
    viewProviders: [DataSourceRegistry, SmartViewManagerService, SmartFormInstanceService, SmartToolbarRegistry, SmartViewerRegistryService, SmartTabFolderRegistryService]
})
export class LandingPageFormComponent extends SmartFormComponent implements OnInit, OnDestroy, OnChanges {

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        // Add your own initialization logic here

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
            path: 'home',
            component: LandingPageFormComponent,
            canActivate: [SmartRouteGuard],
            outlet: 'view',
            data: {
                BrowserTitleTemplate: 'Home',
                FormId: 'landingPage'
            }
        }]),
        SmartComponentLibraryModule
    ],
    declarations: [
        LandingPageFormComponent
    ],
    entryComponents: [
        LandingPageFormComponent
    ],
    exports: [
        RouterModule
    ]
})
export class LandingPageFormModule { }