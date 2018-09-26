import { BrowserModule } from '@angular/platform-browser';
import { ComboBoxModule } from '@progress/kendo-angular-dropdowns';
import { AppserverManagerComponent } from './appserver-manager.component';
import { NgModule } from '@angular/core';
import { GridModule } from '@progress/kendo-angular-grid';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';

@NgModule({
  imports: [CommonModule, GridModule, FormsModule, ComboBoxModule, InputsModule, ButtonsModule],
  declarations: [AppserverManagerComponent],
  exports: [GridModule, AppserverManagerComponent]
})
export class AppserverManagerModule {

}
