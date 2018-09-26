import { BrowserModule } from '@angular/platform-browser';
import { SessionInfoComponent } from './session-info.component';
import { NgModule } from '@angular/core';
import { GridModule} from '@progress/kendo-angular-grid';
import { PanelBarModule } from '@progress/kendo-angular-layout';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, GridModule, PanelBarModule, FormsModule],
  declarations: [SessionInfoComponent],
  exports: [GridModule, PanelBarModule, SessionInfoComponent]
})
export class SessionInfoModule {

}
 