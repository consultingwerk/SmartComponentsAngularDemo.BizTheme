import { Component, OnInit } from '@angular/core';
import { SmartHttpService, SmartServiceAdapter } from "@consultingwerk/smartcomponent-library";

@Component({
  selector: 'session-info',
  templateUrl: './session-info.component.html',
  styleUrls: ['./session-info.component.css']
})
export class SessionInfoComponent implements OnInit {
  sessionInfo: any[];


  constructor(public serviceAdapter: SmartServiceAdapter,
              private smartHttp: SmartHttpService) { }

  ngOnInit() {
    this.smartHttp.get<any>(`${this.serviceAdapter.smartRestURI}/SessionInfo`)
          .subscribe(response => { 
            this.sessionInfo = response.SessionInfo; 
            console.log(this.sessionInfo) 
          });
  }

}
 