import { Component, OnInit, AfterViewInit, ViewChild, Output } from '@angular/core';
import { SmartHttpService, SmartServiceAdapter } from "@consultingwerk/smartcomponent-library";

@Component({
  selector: 'abl-dojo',
  templateUrl: './abl-dojo.component.html',
  styleUrls: ['./abl-dojo.component.css']
})
export class AblDojoComponent implements OnInit, AfterViewInit {

  @ViewChild('editor') editor;

   ablSource: string = 'BLOCK-LEVEL ON ERROR UNDO, THROW.\n\n';
   ablResult: string = '';

  public fileIsOver: boolean = false;

  @Output() public options = {
    readAs: 'Text'
  };

  private file: File;


  constructor(public serviceAdapter: SmartServiceAdapter,
              private smartHttp: SmartHttpService) {

    const now = new Date();
    const hours = now.getHours();

    if (hours >= 4 && hours <= 9) {
      this.ablSource = this.ablSource +
        'MESSAGE "Good morning," Consultingwerk.Framework.Session.SessionManager:UserFullName SKIP(1). \n\n';
    }
    else {
      if (hours <= 17) {
        this.ablSource = this.ablSource +
          'MESSAGE "Good day," Consultingwerk.Framework.Session.SessionManager:UserFullName SKIP(1). \n\n';
      }
      else {
        if (hours <= 21) {
          this.ablSource = this.ablSource +
            'MESSAGE "Good evening," Consultingwerk.Framework.Session.SessionManager:UserFullName SKIP(1). \n\n';
        }
        else {
          this.ablSource = this.ablSource +
            'MESSAGE "Good night," Consultingwerk.Framework.Session.SessionManager:UserFullName SKIP(1). \n\n';
        }
      }
    }

    this.ablSource = this.ablSource + 'FIND FIRST Customer NO-LOCK .\n\n' +
                                      'Consultingwerk.Util.BufferHelper:ShowBuffer (BUFFER Customer:HANDLE). \n';
  }

  executeAbl () {

    this.smartHttp.post<string> (`${this.serviceAdapter.smartRestURI}/ExecuteAbl`, this.ablSource, { responseType: 'text' })
        .subscribe(response => {
            this.ablResult = response;
        });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
      this.editor.setTheme('eclipse');

      this.editor.getEditor().setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: false,
        enableLiveAutocompletion: true
      });

      this.editor.getEditor().commands.addCommand({
          name: 'showOtherCompletions',
          bindKey: 'Ctrl-X',
          exec: (editor) => {
            this.executeAbl();
          }
      })
  }

  public fileOver(fileIsOver: boolean): void {
    this.fileIsOver = fileIsOver;
  }

  public onFileDrop(file: File): void {
    this.ablSource = file.toString();
  }
}
