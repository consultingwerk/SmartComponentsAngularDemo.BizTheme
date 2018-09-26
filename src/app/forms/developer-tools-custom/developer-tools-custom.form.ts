import { SmartComponentLibraryModule, SmartFormComponent, DataSourceRegistry, SmartViewManagerService, SmartFormInstanceService, SmartToolbarRegistry, CustomSmartForm } from '@consultingwerk/smartcomponent-library';
import { Component, Injector, OnInit, OnDestroy, OnChanges, SimpleChanges, NgModule, ChangeDetectorRef } from '@angular/core'
import { CommonModule } from '@angular/common';
import { ServersideLoggingModule } from '../../serverside-logging/serverside-logging.module';
import { AppserverManagerModule } from '../../appserver-manager/appserver-manager.module';
import { AblDojoModule } from '../../abl-dojo/abl-dojo.module';
import { FileInfoModule } from '../../file-info/file-info.module';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { SessionInfoModule } from '../../session-info/session-info.module';
import { InputsModule } from '@progress/kendo-angular-inputs';

@CustomSmartForm('devToolsForm')
@Component({
    selector: 'developer-tools-custom-form',
    
    templateUrl: './developer-tools-custom.form.html',
    styleUrls: ['./developer-tools-custom.form.css'],
    
    viewProviders: [DataSourceRegistry, SmartViewManagerService, SmartFormInstanceService, SmartToolbarRegistry]
})
export class DeveloperToolsCustomFormComponent extends SmartFormComponent implements OnInit, OnDestroy, OnChanges {

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
        LayoutModule,
        InputsModule,
        SmartComponentLibraryModule,
        ServersideLoggingModule,
        AppserverManagerModule,
        AblDojoModule,
        FileInfoModule,
        SessionInfoModule
    ],
    entryComponents: [ DeveloperToolsCustomFormComponent ],
    declarations: [
        DeveloperToolsCustomFormComponent
    ]
})
export class DeveloperToolsCustomFormModule { }