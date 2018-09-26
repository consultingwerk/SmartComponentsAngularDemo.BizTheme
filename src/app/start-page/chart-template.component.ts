import { Component, OnInit, Input, NgModule } from "@angular/core";
import { DataSourceRegistry, SmartCustomComponent, SmartComponentLibraryModule } from "@consultingwerk/smartcomponent-library";
import { CommonModule } from "@angular/common";
import { ChartsModule } from '@progress/kendo-angular-charts';
import { first } from 'rxjs/operators';
@SmartCustomComponent('salesrepChart')
@Component({
    selector: 'chart-template',
    template: `
        <kendo-chart [categoryAxis]="{ categories: categories }">
        <kendo-chart-title [text]="title"></kendo-chart-title>
        <kendo-chart-legend position="bottom" orientation="horizontal"></kendo-chart-legend>
        <kendo-chart-tooltip format="{0}US$"></kendo-chart-tooltip>
        <kendo-chart-series>
            <kendo-chart-series-item *ngFor="let item of series"
                type="line" style="smooth" [data]="item.data" [name]="item.name">
            </kendo-chart-series-item>
        </kendo-chart-series>
        </kendo-chart>
    `

})
export class ChartTemplateComponent implements OnInit {


    series: any[] = [];
    categories: string[] = ['Jan', "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    @Input()
    title: string;
    
    @Input()
    smartDataSource: string;

    constructor(private dsReg: DataSourceRegistry) {

    }

    ngOnInit() {
        this.dsReg.dataSourceAdded.pipe(first(ev => ev.dataSourceName === this.smartDataSource))
            .subscribe(ev => {
                let dataSource = ev.dataSource;
                dataSource.fetch()
                    .then(result => {
                        this.series = result.data.map(salesrep => {
                            const serie = {
                                name: salesrep.RepName,
                                data: Object.keys(salesrep).filter(key => key.startsWith('MonthQuota')).map(month => salesrep[month])
                            };

                            return serie;
                        });

                        console.log('salesrep series', this.series);
                    });
            });
    }

}
@NgModule({
    imports: [
        CommonModule,
        SmartComponentLibraryModule,
        ChartsModule
    ],
    declarations: [
        ChartTemplateComponent
    ],
    entryComponents: [
        ChartTemplateComponent
    ]
})
export class StartPageModule {}