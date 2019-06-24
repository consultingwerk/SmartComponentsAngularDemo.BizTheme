import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

export class LoadingStateService {
    public loadingState: ReplaySubject<boolean> = new ReplaySubject(1)

    constructor() { }

    public broadcastLoadingState(isLoading: boolean) { 
        this.loadingState.next(isLoading);
    }

}