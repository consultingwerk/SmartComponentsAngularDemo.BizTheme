import { BrowserModule } from '@angular/platform-browser';
import { AblDojoComponent } from './abl-dojo.component';
import { NgModule } from '@angular/core';
import { GridModule} from '@progress/kendo-angular-grid';
import { PanelBarModule } from '@progress/kendo-angular-layout';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AceEditorModule } from 'ng2-ace-editor';
import { FileDropModule } from 'angular2-file-drop';
import { InputsModule } from '@progress/kendo-angular-inputs';

@NgModule({
  imports: [CommonModule, GridModule, PanelBarModule, FormsModule, FileDropModule, AceEditorModule, InputsModule],
  declarations: [AblDojoComponent],
  exports: [GridModule, PanelBarModule, AblDojoComponent]
})
export class AblDojoModule {

}
