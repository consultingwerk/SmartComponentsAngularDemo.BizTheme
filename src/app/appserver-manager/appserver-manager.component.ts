import { Component, OnInit } from '@angular/core';
import { SmartHttpService, SmartServiceAdapter } from "@consultingwerk/smartcomponent-library";
import { Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'appserver-manager',
  templateUrl: './appserver-manager.component.html',
  styleUrls: ['./appserver-manager.component.css']
})
export class AppserverManagerComponent implements OnInit {

   servers: any[];
   sessions: any[];

   userName: string = "tomcat";
   password: string = "tomcat";
   applications: string[] = [];
   selectedApplication: string = "";
   fetchApplicationResult: any;

  constructor(public serviceAdapter: SmartServiceAdapter,
    private smartHttp: SmartHttpService) {

  }

  ngOnInit() {
  }

  fetchApplications() {

    let headers: Headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(this.userName + ":" + this.password));
    let options = new RequestOptions({ headers: headers, withCredentials: true });

    this.smartHttp.get<any>(`${this.serviceAdapter.serviceURI}/oemanager/applications`, options)
      .subscribe(async response => {
        const json = response.body;

        this.fetchApplicationResult = json;

        this.applications = [];
        console.log(json);

        json.result.Application.forEach(element => {
          this.applications.push(element.name);
        });

        if (this.applications.length > 0) {
          this.selectedApplication = this.applications[0];
          this.fetchServers();
        } else {
          this.selectedApplication = '';
        }
      });
  }

  fetchServers() {

    let headers: Headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(this.userName + ":" + this.password));
    let options = new RequestOptions({ headers: headers, withCredentials: true });

    let observable = this.smartHttp.get<any>(`${this.serviceAdapter.serviceURI}/oemanager/applications/${this.selectedApplication}/agents`, options);
    observable.subscribe(async response => {
      const json = response.body;
      this.servers = json.result.agents; 
    });
    return observable;
  }

  trimServers() {

    let headers: Headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(this.userName + ":" + this.password));
    let options = new RequestOptions({ headers: headers, withCredentials: true });

    this.servers.forEach(element => {

      this.smartHttp.delete
        (`${this.serviceAdapter.serviceURI}/oemanager/applications/${this.selectedApplication}/agents/${element.agentId}`, options)
        .subscribe(response => {
          console.log(response);
        });
    });

    this.fetchServers().subscribe(() => {
      // pause 1 second and then call fetchServers() again
      setTimeout(() => {
        this.fetchServers();
      }, 2000);
    });
  }
}
