import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SmartComponentLibraryModule, SmartRouteGuard } from '@consultingwerk/smartcomponent-library';
import { SchedulerJobStatusFormComponent } from './scheduler-job-status.form';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { LoadingStateService } from './scheduler-loading.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([{
            path: 'scheduler-job-status',
            component: SchedulerJobStatusFormComponent,
            canActivate: [SmartRouteGuard],
            outlet: 'view',
            data: {
                
                BrowserTitleTemplate: 'Scheduler Job Status Monitor', 
                FormId: 'schedulerJobStatusForm'
            }
        }]), 
        SmartComponentLibraryModule
    ],
    declarations: [
        SchedulerJobStatusFormComponent,
        LoadingIndicatorComponent 
    ],
    entryComponents: [
        SchedulerJobStatusFormComponent,
        LoadingIndicatorComponent
    ],
    exports: [
        RouterModule
    ],
    providers: [
        LoadingStateService
    ]
})
export class SchedulerJobStatusFormModule { }