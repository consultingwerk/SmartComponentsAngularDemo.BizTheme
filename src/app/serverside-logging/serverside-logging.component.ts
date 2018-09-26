import { Component, OnInit } from '@angular/core';
import {
  SessionContext,
  SmartConfig,
  SmartSessionManagerService,
  SmartServiceAdapter
} from '@consultingwerk/smartcomponent-library';

@Component({
  selector: 'serverside-logging',
  templateUrl: './serverside-logging.component.html',
  styleUrls: ['./serverside-logging.component.css']
})
export class ServersideLoggingComponent implements OnInit {

   logEntryTypes: string = '';
   customLogEntryTypes: string = '';
   debugMode: boolean = false;

  sessionCtx: SessionContext;

  constructor(public smartConfig: SmartConfig,
              private sessionManager: SmartSessionManagerService) { }

  applySettings () {
    this.sessionCtx.ServerLogEntryTypes = this.logEntryTypes;
    this.sessionCtx.ServerCustomLogEntries = this.customLogEntryTypes;
    this.sessionCtx.ServerDebugMode = this.debugMode;

    console.log (this.sessionCtx);
  }

  ngOnInit() {

    this.sessionManager.sessionContext.subscribe (context => {
      this.sessionCtx = context;

      console.log (context);

      this.logEntryTypes = context.ServerLogEntryTypes;
      this.customLogEntryTypes = context.ServerCustomLogEntries;
      this.debugMode = context.ServerDebugMode;
    });

  }

}
