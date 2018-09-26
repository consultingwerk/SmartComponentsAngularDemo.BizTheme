import { Component, OnInit } from '@angular/core';
import { SmartSessionManagerService, SessionContext } from '@consultingwerk/smartcomponent-library';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  sessionCtx: SessionContext;

  constructor(private sessionManager: SmartSessionManagerService) { }

  ngOnInit() {
    this.sessionManager.sessionContext.subscribe(ctx => this.sessionCtx = ctx);
  }

}
