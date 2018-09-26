import { BrowserModule } from '@angular/platform-browser';
import { FileInfoComponent } from './file-info.component';
import { NgModule } from '@angular/core';
import { GridModule} from '@progress/kendo-angular-grid';
import { PanelBarModule } from '@progress/kendo-angular-layout';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';

@NgModule({
  imports: [CommonModule, GridModule, PanelBarModule, FormsModule, InputsModule],
  declarations: [FileInfoComponent],
  exports: [GridModule, PanelBarModule, FileInfoComponent]
})
export class FileInfoModule {

}
