import { Component, OnInit } from '@angular/core';
import { SmartHttpService, SmartServiceAdapter } from "@consultingwerk/smartcomponent-library";

@Component({
  selector: 'file-info',
  templateUrl: './file-info.component.html',
  styleUrls: ['./file-info.component.css']
})
export class FileInfoComponent implements OnInit {

   fileName: string = "";
   searchResult: string = "Perform File search first";
   fileInfo: any[];

  constructor(public serviceAdapter: SmartServiceAdapter,
              private smartHttp: SmartHttpService) { }

  click (event) {
    this.fileName = event.srcElement.innerText;

    this.searchFile();
  }

  searchFile() {
    if (this.fileName == "")
    {
      alert ("Please enter a file name first!");
    }
    else
    {
      this.smartHttp.get<any>(`${this.serviceAdapter.smartRestURI}/FileSearch/` + this.fileName)
            .subscribe(response => {
              const json = response;

              this.searchResult = json.Search;
              this.fileInfo = json.Properties;
            });
    }
  }

  ngOnInit() {
  }
}
