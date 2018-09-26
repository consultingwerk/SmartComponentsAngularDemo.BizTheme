import { Component, OnInit } from '@angular/core';
import {
    SessionContext,
    SmartConfig,
    SmartSessionManagerService,
    SmartServiceAdapter,
    SmartHttpService
} from '@consultingwerk/smartcomponent-library';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './custom-root.component.html',
  styleUrls: ['./custom-root.component.css']
})
export class CustomRootComponent implements OnInit {

  sessionCtx: SessionContext;
  authenticated: boolean;

  constructor(public smartConfig: SmartConfig,
              private sessionContext: SmartSessionManagerService,
              private serviceAdapter: SmartServiceAdapter,
              private http: SmartHttpService) { }

  async ngOnInit() {
    this.sessionContext.sessionContext.subscribe(context => {
      this.sessionCtx = context;
    });
    this.serviceAdapter.pipe(filter(state => !!state))
        .subscribe(state => { this.authenticated = state.authenticated; });

  }

 
}
