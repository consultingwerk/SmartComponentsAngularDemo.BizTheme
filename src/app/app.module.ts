import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SmartComponentLibraryModule, SmartRouteGuard, SmartFormOutletComponent } from '@consultingwerk/smartcomponent-library';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomRootComponent } from './custom-root/custom-root.component';
import { LogoutComponent } from './logout/logout.component';

import { IntlModule } from '@progress/kendo-angular-intl';
import { CustomerMaintenanceFormModule } from './forms/customer-maintenance/customer-maintenance.form';
import { DeveloperToolsCustomFormModule } from './forms/developer-tools-custom/developer-tools-custom.form';
import { StartPageModule } from './start-page/chart-template.component';
import { NavbarComponent } from './navbar/navbar.component';
import {CustomerOrderFormModule} from "./forms/customer-order/customer-order.form";
import {CustomerTabfolderFormModule} from "./forms/customer-tabfolder/customer-tabfolder.form";
import {CustomerMaintenanceHtmlFormModule} from "./forms/customer-maintenance-html/customer-maintenance-html.form";
import { CustomerMaintenanceAnnotationsFormModule } from './forms/customer-maintenance-annotations/customer-maintenance-annotations.form';
import { environment } from '../environments/environment';
import '@progress/kendo-angular-intl/locales/de/all';
import { CustomOrdersFormModule } from './forms/custom-orders/custom-orders.form';
import {CalculatorFormModule} from "./forms/calculator/calculator.form";
import { SchedulerJobStatusFormModule } from './forms/scheduler-job-status/scheduler-job-status.module';
import { FieldSecurityItemMaintenanceFormModule } from './forms/field-security-item-maintenance/field-security-item-maintenance.form';
import { MessageMaintenanceFormModule } from './forms/message-maintenance/message-maintenance.form';
import { SecurityObjectMaintenanceFormModule } from './forms/security-object-maintenance/security-object-maintenance.form';
import { SecurityTokenMaintenanceFormModule } from './forms/security-token-maintenance/security-token-maintenance.form';
import { SecurityRealmMaintenanceFormModule } from './forms/security-realm-maintenance/security-realm-maintenance.form';

@NgModule({
  declarations: [
    AppComponent,
    CustomRootComponent,
    LogoutComponent,
    NavbarComponent
  ],
  entryComponents: [LogoutComponent],
  imports: [
		CalculatorFormModule,
    CustomerMaintenanceAnnotationsFormModule,
		CustomerMaintenanceHtmlFormModule,
		CustomerTabfolderFormModule,
    CustomerOrderFormModule,
    CustomOrdersFormModule,
    BrowserModule,
    SchedulerJobStatusFormModule,
		FieldSecurityItemMaintenanceFormModule,
		MessageMaintenanceFormModule,
		SecurityObjectMaintenanceFormModule,
		SecurityTokenMaintenanceFormModule,
    SecurityRealmMaintenanceFormModule,
    IntlModule,
    DeveloperToolsCustomFormModule,
    CustomerMaintenanceFormModule,
    StartPageModule,
    SmartComponentLibraryModule.forRoot({
      defaultRoute: '/start',
      serviceURI: 'http://localhost:8820/',
      //serviceURI: 'http://192.168.0.122:8820',
      //serviceURI: 'http://localhost:30010',
      //serviceURI: 'http://192.168.0.44:8820/',
      //serviceURI: 'http://localhost:30010/',
      //templateURI: 'http://localhost:8820/web',
      // smartRestURI: 'http://localhost:8820/web/',
      // imageURI: 'http://localhost:8820/static/smartimages/',
      //
      // serviceURI: 'http://192.168.0.44:8820/web',
      //
      // serviceURI: 'http://localhost:8980/SmartJsdoBackendService',
      // catalogURI: 'http://localhost:8980/SmartJsdoBackendService/rest/SmartJsdoBackendService',
      // smartRestURI: 'http://localhost:8980/SmartJsdoBackendService/static/staticbackend/',
      // imageURI: 'http://localhost:8980/SmartJsdoBackendService/static/smartimages/',
      // templateURI: 'http://localhost:8980/SmartJsdoBackendService/static/staticbackend',
      breadcrumbNavigation: false,
      mdiInterface: false,
      moduleCode: 'Web2 Demo',
      development: false,
      componentDefaults: {
        grid: {
          cellTextWrap: true,
          showNoDataMessage: true
        }
      },
      enableRippleEffect: true
    }),
    BrowserAnimationsModule,
    RouterModule.forRoot([{
      path: 'logout',
      component: LogoutComponent
    }, {
      path: 'start',
      outlet: 'view',
      canActivate: [SmartRouteGuard],
      component: SmartFormOutletComponent,
      data: {
        BrowserTitleTemplate: 'Start',
        ViewUri: `frontend://${environment.baseHref}assets/start-page.layout.json`
      }
    }],
    { useHash: true })
  ],
  providers: [
    {  provide: LOCALE_ID, useValue: 'de-DE' }
  ],
  bootstrap: [CustomRootComponent]
})
export class AppModule { }
