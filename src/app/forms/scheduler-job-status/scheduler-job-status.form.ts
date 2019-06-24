import { SmartComponentLibraryModule, SmartFormComponent, CustomSmartForm, DataSourceRegistry, SmartViewerRegistryService, SmartTabFolderRegistryService, SmartViewManagerService, SmartFormInstanceService, SmartToolbarRegistry, SmartRouteGuard, WidgetFacadeFactory, SmartViewerComponent, SmartDataSource, SmartToolbarComponent } from '@consultingwerk/smartcomponent-library';
import { Component, Injector, OnInit, OnDestroy, OnChanges, SimpleChanges, NgModule, ViewChild } from '@angular/core'
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
import { first, switchMap } from 'rxjs/operators';
// import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { LoadingStateService } from './scheduler-loading.service';

@CustomSmartForm('schedulerJobStatusForm')
@Component({
    selector: 'scheduler-job-status-form',
    templateUrl: '../../../../node_modules/@consultingwerk/smartcomponent-library/ui/form/smart-form.component.html',
    viewProviders: [DataSourceRegistry, SmartViewManagerService, SmartFormInstanceService, SmartToolbarRegistry, SmartViewerRegistryService, SmartTabFolderRegistryService]
})
export class SchedulerJobStatusFormComponent extends SmartFormComponent implements OnInit, OnDestroy, OnChanges {
    // @ViewChild(SmartViewerComponent) schedulerViewer: SmartViewerComponent;
    private schedulerDataSource: SmartDataSource;
    public showAnimation: boolean = false;
    private toolbar;

    constructor(
        injector: Injector,
        private widgetFactory: WidgetFacadeFactory,
        private dsRegistry: DataSourceRegistry,
        private toolbarRegistry: SmartToolbarRegistry,
        private viewerRegistry: SmartViewerRegistryService,
        private loadingStateService: LoadingStateService) {
        super(injector);
    }

    ngOnInit() {
        this.setFormConfiguration('frontend://assets/scheduler/scheduler-job-status.layout.json');
        
        super.ngOnInit();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);
    }

    async ngAfterViewInit() {
        // this.viewerRegistry.getSmartViewer("SchedulerViewer")
        //     .pipe(
        //         switchMap(viewer => viewer.inputValueChanged)
        //     ).subscribe(ev => {
        //         console.log("Viewer value changed" + Math.random());
        //     })

        // this.schedulerViewer.inputValueChanged.subscribe(() => {
        //     console.log("Viewer value changed" + Math.random());
        // });

        const schedulerDataSource = this.dsRegistry.getDataSource('SchedulerJobStatusDataSource') || 
            (await this.dsRegistry.dataSourceAdded.pipe(first(ev => ev.dataSourceName === 'SchedulerJobStatusDataSource'))
            .toPromise()).dataSource;

        this.schedulerDataSource = schedulerDataSource;

        const toolbar = this.toolbarRegistry.getToolbar('SchedulerToolbar') || 
            (await this.toolbarRegistry.toolbarRegistered.pipe(first(ev => ev.toolbarName === 'SchedulerToolbar'))
            .toPromise()).toolbar;
        this.toolbar = toolbar;
        
        // this.schedulerDataSource.afterSaveChanges = () => {
        //     console.log("in arrow function")
        //     console.log("JobStatusGuid:", this.schedulerDataSource.selected.SchedulerJobStatusGuid);
        //     console.log("JobStatus:", this.schedulerDataSource.selected.JobStatus);

        //     this.schedulerDataSource.invokeMethod("SetJobStatus", {
        //         plcParameter: {
        //             SchedulerJobStatusGuid: this.schedulerDataSource.selected.SchedulerJobStatusGuid,
        //             JobStatus: this.schedulerDataSource.selected.JobStatus
        //         }
        //     })
        // }
    }

    public PutJobStatusOnHoldHandler() {
        this.loadingStateService.broadcastLoadingState(true);
        this.toolbar.disableButtons(['status-onhold', 'status-scheduled', 'status-cancelled']);

        this.schedulerDataSource.invokeMethod("SetJobStatus", {
            plcParameter: {
                SchedulerJobStatusGuid: this.schedulerDataSource.selected.SchedulerJobStatusGuid,
                JobStatus: "OnHold"
            }
        })
        .then(() => { 
            this.schedulerDataSource.selected.JobStatus = "OnHold";
            this.loadingStateService.broadcastLoadingState(false);
            this.toolbar.enableButtons(['status-onhold', 'status-scheduled', 'status-cancelled']);
        })
        .catch(err => {
            this.loadingStateService.broadcastLoadingState(false);
            this.toolbar.enableButtons(['status-onhold', 'status-scheduled', 'status-cancelled']);
        })
    }

    public PutJobStatusOnCancelledHandler() {
        this.loadingStateService.broadcastLoadingState(true);
        this.toolbar.disableButtons(['status-onhold', 'status-scheduled', 'status-cancelled']);

        this.schedulerDataSource.invokeMethod("SetJobStatus", {
            plcParameter: {
                SchedulerJobStatusGuid: this.schedulerDataSource.selected.SchedulerJobStatusGuid,
                JobStatus: "Cancelled"
            }
        })
        .then(() => { 
            this.schedulerDataSource.selected.JobStatus = "Cancelled";
            this.loadingStateService.broadcastLoadingState(false);
            this.toolbar.enableButtons(['status-onhold', 'status-scheduled', 'status-cancelled']);
        })
        .catch(err => {
            this.loadingStateService.broadcastLoadingState(false);
            this.toolbar.enableButtons(['status-onhold', 'status-scheduled', 'status-cancelled']);
        })
    }

    public PutJobStatusOnScheduledHandler() {
        this.loadingStateService.broadcastLoadingState(true);
        this.toolbar.disableButtons(['status-onhold', 'status-scheduled', 'status-cancelled']);

        this.schedulerDataSource.invokeMethod("SetJobStatus", {
            plcParameter: {
                SchedulerJobStatusGuid: this.schedulerDataSource.selected.SchedulerJobStatusGuid,
                JobStatus: "Scheduled"
            }
        })
        .then(() => { 
            this.schedulerDataSource.selected.JobStatus = "Scheduled";
            this.loadingStateService.broadcastLoadingState(false);
            this.toolbar.enableButtons(['status-onhold', 'status-scheduled', 'status-cancelled']);
        })
        .catch(err => {
            this.loadingStateService.broadcastLoadingState(false); 
            this.toolbar.enableButtons(['status-onhold', 'status-scheduled', 'status-cancelled']);
        })
    }

    public RefreshHandler() {
        let selectedRow = this.schedulerDataSource.selectedIndex;

        this.schedulerDataSource.refreshCurrentBatch()
        .then(() => {
            this.schedulerDataSource.selectedIndex = selectedRow;
        })
        .catch(err => {})
    }

}