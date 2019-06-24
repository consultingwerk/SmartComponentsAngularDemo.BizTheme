import { Component, OnInit } from "@angular/core";
import { SmartCustomComponent } from '@consultingwerk/smartcomponent-library';
import { LoadingStateService } from '../scheduler-loading.service';

@SmartCustomComponent('loadingIndicator')
@Component({
    selector: 'loading-indicator',
    templateUrl: './loading-indicator.component.html',
    styleUrls: ['./loading-indicator.component.css']
})
export class LoadingIndicatorComponent implements OnInit {
    public showAnimation: boolean = false;

    constructor(
        private loadingStateService: LoadingStateService
    ) {}

    ngOnInit() {
        this.loadingStateService.loadingState.subscribe(isLoading => this.showAnimation = isLoading)
    }

}